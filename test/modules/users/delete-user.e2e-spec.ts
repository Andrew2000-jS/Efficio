import { TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { testModule, usePipes, E2EConfigurations, mockUser } from '../shared';

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

    it('should can delete a user', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .delete(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(body).toHaveProperty('message', 'User deleted successfully');
      expect(statusCode).toBe(200);
    });
  });

  describe('Failure Cases', () => {
    it("shouldn't delete a user if token is invalid", async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .delete(`/users/${userId}`)
        .set('Authorization', `Bearer null`);

      expect(body).toHaveProperty('message', 'Invalid token');
      expect(statusCode).toBe(401);
    });

    it("shouldn't delete a user if this doesn't exist", async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .delete(`/users/non-id`)
        .set('Authorization', `Bearer ${token}`);

      expect(body).toHaveProperty('message', 'User not found!');
      expect(statusCode).toBe(400);
    });
  });

  afterAll(async () => {
    await configuration.cleanDB();
    await app.close();
  });
});
