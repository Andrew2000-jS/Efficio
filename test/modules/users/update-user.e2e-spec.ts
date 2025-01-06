import { TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { testModule, usePipes, E2EConfigurations } from '../shared';
import { mockUser } from './users.mock';

const configuration = new E2EConfigurations();

describe('User end-to-end tests', () => {
  let app: INestApplication;
  let token: string | null;
  let userId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await testModule.compile();
    app = moduleFixture.createNestApplication();
    usePipes(app);
    await app.init();
    await configuration.initialize();
    await configuration.cleanDB();
  });

  describe('Success Cases', () => {
    beforeAll(async () => {
      const user = await request(app.getHttpServer())
        .post('/users')
        .send(mockUser);

      const { body } = await request(app.getHttpServer())
        .post('/auth/digest')
        .send({
          email: mockUser.email,
          password: mockUser.password,
        });

      userId = user.body.data.id;
      token = body.data;
    });

    it('should can update a user', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .patch(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Bill' });

      expect(body).toHaveProperty('data.name', 'Bill');
      expect(statusCode).toBe(200);
    });
  });

  describe('Failure Cases', () => {
    it("shouldn't update a user if token is invalid", async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .patch(`/users/${userId}`)
        .set('Authorization', `Bearer null`)
        .send({ name: 'Bill' });

      expect(body).toHaveProperty('message', 'Invalid token');
      expect(statusCode).toBe(401);
    });

    it("shouldn't update a user if this doesn't exist", async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .patch(`/users/non-id`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Bill' });

      expect(body).toHaveProperty('message', 'User not found!');
      expect(statusCode).toBe(400);
    });

    it("shouldn't update a user if some property is invalid", async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .patch(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'B1ll' });

      expect(body).toHaveProperty('message', 'User name is invalid!');
      expect(statusCode).toBe(400);
    });
  });

  afterAll(async () => {
    await configuration.cleanDB();
    await app.close();
  });
});
