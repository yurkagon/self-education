import { Module } from '@nestjs/common';

import { ActorService } from './actor.service.js';
import { ActorController } from './actor.controller.js';

@Module({
  imports: [],
  controllers: [ActorController],
  providers: [ActorService],
  exports: [ActorService],
})
export class ActorModule {}
