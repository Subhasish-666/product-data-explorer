import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('Products (e2e)', () => {
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

  /* ---------------- GET /products ---------------- */

  it('GET /products should return paginated products', async () => {
    const response = await request(app.getHttpServer())
      .get('/products')
      .query({
        category: 'fiction', // slug may or may not exist
        page: 1,
        limit: 10,
      })
      .expect(200);

    expect(response.body).toHaveProperty('items');
    expect(response.body).toHaveProperty('hasMore');

    expect(Array.isArray(response.body.items)).toBe(
      true,
    );

    if (response.body.items.length > 0) {
      const product = response.body.items[0];

      expect(product).toHaveProperty('source_id');
      expect(product).toHaveProperty('title');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('currency');
      expect(product).toHaveProperty('image_url');
    }
  });

  /* ---------------- GET /products/:id ---------------- */

  it('GET /products/:sourceId should return product detail or 404', async () => {
    const sourceId = 'test-source-id';

    const response = await request(app.getHttpServer())
      .get(`/products/${sourceId}`);

    // Either product exists OR scrape was queued
    expect([200, 404]).toContain(response.status);

    if (response.status === 200) {
      expect(response.body).toHaveProperty(
        'source_id',
        sourceId,
      );
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('price');
      expect(response.body).toHaveProperty('currency');
      expect(response.body).toHaveProperty('image_url');
    }
  });

  /* ---------------- POST /products/:id/refresh ---------------- */

  it('POST /products/:sourceId/refresh should queue scrape job', async () => {
    const sourceId = 'test-source-id';

    const response = await request(app.getHttpServer())
      .post(`/products/${sourceId}/refresh`)
      .expect(201);

    expect(response.body).toEqual({
      status: 'queued',
      sourceId,
    });
  });
});