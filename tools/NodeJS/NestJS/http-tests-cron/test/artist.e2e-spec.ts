import { INestApplication } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import request from 'supertest';

import { bootstrapE2eApp } from './helpers/bootstrap-e2e-app';

function uniqueLabel(prefix: string) {
  return `${prefix}-${randomBytes(4).toString('hex')}`;
}

describe('Artist (e2e)', () => {
  let app: INestApplication;
  let resetPrismaStore: () => void;

  beforeAll(async () => {
    const boot = await bootstrapE2eApp();
    app = boot.app;
    resetPrismaStore = boot.resetPrismaStore;
  });

  beforeEach(() => {
    resetPrismaStore();
  });

  afterAll(async () => {
    await app?.close();
  });

  it('GET /artists returns 200 and an array', () => {
    return request(app.getHttpServer())
      .get('/v1/artists')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('POST /artists then GET /artists/:id', async () => {
    const name = uniqueLabel('E2E Artist');
    const genre = uniqueLabel('Genre');

    const created = await request(app.getHttpServer())
      .post('/v1/artists')
      .send({ name, genre })
      .expect(200);

    expect(created.body).toMatchObject({
      name,
      genre,
    });
    expect(typeof created.body.id).toBe('string');

    const one = await request(app.getHttpServer())
      .get(`/v1/artists/${created.body.id}`)
      .expect(200);

    expect(one.body).toMatchObject({ id: created.body.id, name, genre });
  });

  it('GET /artists/:id with unknown id returns 404', () => {
    return request(app.getHttpServer())
      .get('/v1/artists/00000000-0000-4000-8000-000000000000')
      .expect(404);
  });

  it('POST /artists with invalid body returns 400', () => {
    return request(app.getHttpServer())
      .post('/v1/artists')
      .send({})
      .expect(400);
  });
});
