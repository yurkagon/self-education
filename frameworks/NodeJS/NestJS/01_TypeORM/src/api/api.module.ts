import { Module } from '@nestjs/common';

import { MovieModule } from './movie/movie.module';
import { ActorModule } from './actor/actor.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [MovieModule, ActorModule, ReviewModule],
})
export class ApiModule {}

