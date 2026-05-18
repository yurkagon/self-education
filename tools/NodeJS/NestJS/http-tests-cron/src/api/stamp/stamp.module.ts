import { DynamicModule, Module } from '@nestjs/common';

import {
  STAMP_OPTIONS,
  StampModuleAsyncOptions,
  StampModuleOptions,
} from './stamp.options';
import { StampController } from './stamp.controller';
import { StampService } from './stamp.service';

@Module({})
export class StampModule {
  static register(options: StampModuleOptions): DynamicModule {
    return {
      module: StampModule,
      controllers: [StampController],
      providers: [{ provide: STAMP_OPTIONS, useValue: options }, StampService],
      exports: [StampService],
      global: true,
    };
  }

  static registerAsync(options: StampModuleAsyncOptions): DynamicModule {
    return {
      module: StampModule,
      imports: options.imports ?? [],
      controllers: [StampController],
      providers: [
        {
          provide: STAMP_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject ?? [],
        },
        StampService,
      ],
      exports: [StampService],
      global: true,
    };
  }
}
