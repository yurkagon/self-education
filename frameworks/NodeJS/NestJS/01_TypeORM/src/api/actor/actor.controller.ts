import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import { ActorEntity } from './entities/actor.entity';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { AddMovieDto } from '../review/dto/add-movie.dto';
import { MovieEntity } from '../movie/entities/movie.entity';

@Controller({
  path: 'actor',
})
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get()
  public async findAll(): Promise<ActorEntity[]> {
    return this.actorService.findAll();
  }

  @Get(':id')
  public async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ActorEntity> {
    return this.actorService.findOne(id);
  }

  @Post()
  public async create(@Body() dto: CreateActorDto): Promise<ActorEntity> {
    return this.actorService.create(dto);
  }

  @Patch(':id')
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateActorDto,
  ): Promise<ActorEntity> {
    return this.actorService.update(id, dto);
  }

  @Delete(':id')
  public async delete(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ActorEntity> {
    return this.actorService.delete(id);
  }

  @Post(':id/movie')
  public async addMovie(
    @Param('id', ParseUUIDPipe) actorId: string,
    @Body() dto: AddMovieDto,
  ): Promise<ActorEntity> {
    return this.actorService.addMovie(actorId, dto);
  }

  @Delete(':id/movie/:movieId')
  public async removeMovie(
    @Param('id', ParseUUIDPipe) actorId: string,
    @Param('movieId', ParseUUIDPipe) movieId: string,
  ): Promise<ActorEntity> {
    return this.actorService.removeMovie(actorId, movieId);
  }

  @Get(':id/movie')
  public async getMovies(
    @Param('id', ParseUUIDPipe) actorId: string,
  ): Promise<MovieEntity[]> {
    return this.actorService.getMovies(actorId);
  }
}

