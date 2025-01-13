import { TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { testModule, usePipes, E2EConfigurations } from '../shared';
import { mockUser } from '../shared';

const configuration = new E2EConfigurations();

describe('Auth session end-to-end tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await testModule.compile();
    app = moduleFixture.createNestApplication();
    usePipes(app);
    await app.init();
    await configuration.initialize();
  });

  describe('Success Cases', () => {
    let userId;

    beforeAll(async () => {
      const { body } = await request(app.getHttpServer())
        .post('/users')
        .send(mockUser);
      userId = body.data.id;
    });

    it('should allow to login using email and password', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .post('/auth/digest')
        .send({
          email: mockUser.email,
          password: mockUser.password,
        });

      expect(statusCode).toBe(200);
      expect(body).not.toHaveProperty('data', null);
    });

    it('should allow to login using email', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .post('/auth/email')
        .send({
          email: mockUser.email,
        });

      expect(body).toHaveProperty(
        'message',
        'The verification code has been sent to your email. Please check your inbox.',
      );
      expect(statusCode).toBe(200);
    });

    afterAll(async () => {
      await configuration.cleanDB();
    });
  });

  describe('Failure Cases', () => {
    it('should cannot login by digest auth if email or password are incorrect', async () => {
      const invalidEmailTry = await request(app.getHttpServer())
        .post('/auth/digest')
        .send({
          email: 'nonExistingMail@mailto.com',
          password: mockUser.password,
        });

      expect(invalidEmailTry.statusCode).toBe(401);
      expect(invalidEmailTry.body).toHaveProperty(
        'message',
        'Incorrect email or password!',
      );

      const invalidPasswordTry = await request(app.getHttpServer())
        .post('/auth/digest')
        .send({
          email: mockUser.email,
          password: 'H3l10@Th3rE',
        });

      expect(invalidPasswordTry.statusCode).toBe(401);
      expect(invalidPasswordTry.body).toHaveProperty(
        'message',
        'Incorrect email or password!',
      );
    });

    it('should cannot login by email auth if email is incorrect', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .post('/auth/email')
        .send({
          email: 'non-existing-user@mail.com',
        });

      expect(body).toHaveProperty('message', 'Incorrect email or password!');
      expect(statusCode).toBe(401);
    });
  });

  afterAll(async () => {
    await configuration.cleanDB();
    await app.close();
  });
});
