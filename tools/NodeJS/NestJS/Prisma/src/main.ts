import '@dotenvx/dotenvx/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply logger middleware as express middleware
  // app.use(LoggerMiddlewareAsExpressMiddleware);

  app.useGlobalPipes(new ValidationPipe());
  // Apply auth guard to all routes
  // app.useGlobalGuards(new AuthGuard());

  const config = new DocumentBuilder()
    .setTitle('NestJS Course')
    .setDescription('Api documentation for NestJS Course')
    .setVersion('1.0')
    .setContact('Yurii', 'https://github.com/', 'test@gmail.com')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document, {
    customSiteTitle: 'NestJS Course',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
