import '@dotenvx/dotenvx/config';


import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import cookieParser from 'cookie-parser';

import { AppModule } from './app.module.js';
import { useSwagger } from './bootstrap/swagger.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  useSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
