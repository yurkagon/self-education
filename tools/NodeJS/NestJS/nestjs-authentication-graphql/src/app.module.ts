import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'path';

import { ApiModule } from './api/api.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

import type { GraphqlContext } from './common/interfaces/graphql-context.interface.js';

@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => ({
        autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        context: ({ req, res }): GraphqlContext => ({ req, res }),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
