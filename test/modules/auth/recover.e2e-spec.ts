import { TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { testModule, usePipes, E2EConfigurations } from '../shared';
import { mockUser } from '../shared';

const configuration = new E2EConfigurations();

describe('Auth recover end-to-end tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await testModule.compile();
    app = moduleFixture.createNestApplication();
    usePipes(app);
    await app.init();
    await configuration.initialize();
  });

  describe('Success Cases', () => {
    beforeAll(async () => {
      await request(app.getHttpServer()).post('/users').send(mockUser);
    });

    it('should send and validate an OTP code', async () => {
      const recover = await request(app.getHttpServer())
        .post('/auth/recover')
        .send({
          email: mockUser.email,
        });

      expect(recover.statusCode).toBe(200);
      expect(recover.body).toHaveProperty(
        'message',
        'The verification code has been sent to your email. Please check your inbox.',
      );

      const { statusCode } = await request(app.getHttpServer())
        .post('/auth/otp')
        .send({
          email: mockUser.email,
          otp: recover.body.data,
        });

      expect(statusCode).toBe(200);
    });

    afterAll(async () => {
      await configuration.cleanDB();
    });
  });

  describe('Failure Cases', () => {
    it('should cannot send OTP code if user does not exist', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .post('/auth/recover')
        .send({
          email: 'nonexistinguser@mail.com',
        });

      expect(statusCode).toBe(404);
      expect(body).toHaveProperty('message', 'Auth not found');
    });

    it('should cannot validate OTP code if this is invalid', async () => {
      await request(app.getHttpServer()).post('/users').send(mockUser);

      await request(app.getHttpServer()).post('/auth/recover').send({
        email: mockUser.email,
      });

      const { body, statusCode } = await request(app.getHttpServer())
        .post('/auth/otp')
        .send({
          email: mockUser.email,
          otp: 'invalid-otp-code',
        });

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('message', 'OTP is not valid');
    });
  });

  afterAll(async () => {
    await configuration.cleanDB();
    await app.close();
  });
});
