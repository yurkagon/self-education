import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from '../api/auth/auth.constants.js';

export const useSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('NestJS Authentication')
    .setDescription('Authentication API')
    .setVersion('1.0')
    .setContact('Yurii', 'https://github.com/', 'test@gmail.com')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addTag(
      'auth',
      'Register, login, refresh, logout (JWT in httpOnly cookies).',
    )
    .addCookieAuth(
      ACCESS_TOKEN_COOKIE,
      {
        type: 'apiKey',
        description:
          'Access JWT. Issued on register/login. Use on protected routes when a guard reads this cookie.',
      },
      'accessTokenCookie',
    )
    .addCookieAuth(
      REFRESH_TOKEN_COOKIE,
      {
        type: 'apiKey',
        description:
          'Refresh JWT. Issued on register/login; **required** for POST /auth/refresh.',
      },
      'refreshTokenCookie',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });
};
