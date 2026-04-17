import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { ApiModule } from './api/api.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { LoggerMiddleware } from './common/middlewares/logger.middleware.js';
import { ResponseInterceptor } from './common/interceptors/response.interceptor.js';
import { ExceptionsFilter } from './common/filters/exceptions.filter.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ApiModule,
    PrismaModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply logger middleware to all routes
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
