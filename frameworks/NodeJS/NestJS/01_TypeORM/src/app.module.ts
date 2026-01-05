import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getTypeOrmConfig } from './config/typeorm.config';

import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: getTypeOrmConfig,
      inject: [ConfigService],
    }),
    ApiModule,
  ],
})
export class AppModule {}
