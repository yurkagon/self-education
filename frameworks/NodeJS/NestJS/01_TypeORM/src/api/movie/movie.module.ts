import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActorModule } from '../actor/actor.module';

import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieEntity } from './entities/movie.entity';
import { PosterEntity } from './entities/poster.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity, PosterEntity]),
    forwardRef(() => ActorModule),
  ],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}
