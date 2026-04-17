import { Module } from '@nestjs/common';
// import { APP_GUARD } from '@nestjs/core';

import { MovieModule } from './movie/movie.module.js';
import { ActorModule } from './actor/actor.module.js';
import { ReviewModule } from './review/review.module.js';
// import { AuthGuard } from '../common/guards/auth.guard.js';

@Module({
  imports: [MovieModule, ActorModule, ReviewModule],
  // providers: [
  // Apply auth guard to all routes over module scope
  //   {
  //     provide: APP_GUARD,
  //     useClass: AuthGuard,
  //   },
  // ],
})
export class ApiModule {}

