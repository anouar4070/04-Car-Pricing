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
});
