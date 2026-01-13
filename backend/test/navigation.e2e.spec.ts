import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('Navigation (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET / should return navigation headings', async () => {
    const response = await request(app.getHttpServer())
      .get('/')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);

    // If data exists, validate shape (do not assert content)
    if (response.body.length > 0) {
      const item = response.body[0];

      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('slug');
    }
  });
});
