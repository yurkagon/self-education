import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActorEntity } from './entities/actor.entity';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';

import { MovieModule } from '../movie/movie.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActorEntity]),
    forwardRef(() => MovieModule),
  ],
  controllers: [ActorController],
  providers: [ActorService],
  exports: [ActorService],
})
export class ActorModule {}

