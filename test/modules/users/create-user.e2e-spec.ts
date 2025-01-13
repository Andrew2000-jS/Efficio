import { TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { testModule, usePipes, E2EConfigurations } from '../shared';
import {
  mockUser,
  userWithInvalidEmail,
  userWithInvalidLastName,
  userWithInvalidName,
  userWithInvalidPassword,
} from '../shared';

const configuration = new E2EConfigurations();

describe('User end-to-end tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await testModule.compile();
    app = moduleFixture.createNestApplication();
    usePipes(app);
    await app.init();
    await configuration.initialize();
  });

  describe('Success Cases', () => {
    beforeEach(async () => {
      await configuration.cleanDB();
    });

    it('should create a user and allow login', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .post('/users')
        .send(mockUser);

      expect(statusCode).toBe(201);
      expect(body).toHaveProperty('data.email', mockUser.email);
    });
  });

  describe('Failure Cases', () => {
    beforeEach(async () => {
      await configuration.cleanDB();
    });

    it('should cannot create a user if this already exist', async () => {
      await request(app.getHttpServer()).post('/users').send(mockUser);

      const { body, statusCode } = await request(app.getHttpServer())
        .post('/users')
        .send(mockUser);

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('message', 'User already exist!');
    });

    it('should cannot create a user if name is invalid', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .post('/users')
        .send(userWithInvalidName);

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('message', 'User name is invalid!');
    });

    it('should cannot create a user if last name is invalid', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .post('/users')
        .send(userWithInvalidLastName);

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('message', 'User last name is invalid!');
    });

    it('should cannot create a user if email is invalid', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .post('/users')
        .send(userWithInvalidEmail);

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('message[0]', 'email must be an email');
    });

    it('should cannot create a user if password is invalid', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .post('/users')
        .send(userWithInvalidPassword);

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty(
        'message[0]',
        'password is not strong enough',
      );
    });
  });

  afterAll(async () => {
    await configuration.cleanDB();
    await app.close();
  });
});
