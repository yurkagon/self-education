import { Module } from '@nestjs/common';

import { MovieService } from './movie.service.js';
import { MovieController } from './movie.controller.js';

@Module({
  imports: [],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}
