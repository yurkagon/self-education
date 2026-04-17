import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigService } from '@nestjs/config';

import { PrismaClient } from '../../generated/prisma/client.js';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  public constructor(private readonly configService: ConfigService) {
    const adapter = new PrismaPg({
      connectionString: configService.getOrThrow<string>('DATABASE_URL'),
    });
    super({ adapter });
  }

  public async onModuleInit() {
    await this.$connect();
  }

  public async onModuleDestroy() {
    await this.$disconnect();
  }
}

export type * from '../../generated/prisma/models.js';
