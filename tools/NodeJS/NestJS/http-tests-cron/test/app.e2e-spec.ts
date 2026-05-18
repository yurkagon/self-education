import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { bootstrapE2eApp } from './helpers/bootstrap-e2e-app';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const { app: createdApp } = await bootstrapE2eApp();
    app = createdApp;
  });

  afterAll(async () => {
    await app?.close();
  });

  it('GET /unknown returns 404', () => {
    return request(app.getHttpServer()).get('/unknown-route').expect(404);
  });
});
