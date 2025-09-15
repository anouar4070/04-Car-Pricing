/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close(); // 👈 closes DB + Nest context
  });

  it('handles a signup request', async () => {
    const testEmail = 'signup1@test.com';

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: testEmail, password: 'password123' })
      .expect(201);

    expect(res.body.id).toBeDefined();
    expect(res.body.email).toEqual(testEmail);
  });

  it('handles another signup request', async () => {
    const testEmail = 'signup2@test.com';

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: testEmail, password: 'password123' })
      .expect(201);

    expect(res.body.id).toBeDefined();
    expect(res.body.email).toEqual(testEmail);
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const testEmail = 'user1@test.com';
    const testPassword = 'password123';

    // Signup
    const resSignup = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: testEmail, password: testPassword })
      .expect(201);

    const cookie = resSignup.get('Set-Cookie');

    // Get currently logged-in user
    const resWhoAmI = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(resWhoAmI.body.email).toEqual(testEmail);
  });
});
