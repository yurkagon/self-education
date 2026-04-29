import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Param,
  Patch,
  ParseUUIDPipe,
  Delete,
} from '@nestjs/common';

import { MovieEntity } from './entities/movie.entity';
import { MovieService } from './movie.service';

import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AddActorDto } from './dto/add-actor.dto';

@Controller({
  path: 'movie',
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  public async findAll(@Query('search') search?: string): Promise<MovieEntity[]> {
    return this.movieService.findAll(search);
  }

  @Get(':id')
  public async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<MovieEntity> {
    return this.movieService.findOne(id);
  }

  @Post()
  public async create(@Body() dto: CreateMovieDto): Promise<MovieEntity> {
    return this.movieService.create(dto);
  }

  @Patch(':id')
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateMovieDto,
  ): Promise<MovieEntity> {
    return this.movieService.update(id, dto);
  }

  @Post(':id/actor')
  public async addActor(
    @Param('id', ParseUUIDPipe) movieId: string,
    @Body() dto: AddActorDto,
  ): Promise<MovieEntity> {
    return this.movieService.addActor(movieId, dto);
  }

  @Delete(':id/actor/:actorId')
  public async removeActor(
    @Param('id', ParseUUIDPipe) movieId: string,
    @Param('actorId', ParseUUIDPipe) actorId: string,
  ): Promise<MovieEntity> {
    return this.movieService.removeActor(movieId, actorId);
  }
}
