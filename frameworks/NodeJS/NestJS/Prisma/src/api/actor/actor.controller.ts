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
import { ApiHeader, ApiResponse } from '@nestjs/swagger';

import { MovieModel } from '../../prisma/prisma.service.js';

import { CreateActorDto } from './dto/create-actor.dto.js';
import { UpdateActorDto } from './dto/update-actor.dto.js';
import { AddMovieDto } from '../review/dto/add-movie.dto.js';

import { ActorService, type Actor } from './actor.service.js';

@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token.',
  required: false,
})
@Controller({
  path: 'actor',
})
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @ApiResponse({ status: 200, description: 'List returned.' })
  @Get()
  public async findAll(): Promise<Actor[]> {
    return this.actorService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Actor returned.' })
  @Get(':id')
  public async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Actor> {
    return this.actorService.findOne(id);
  }

  @ApiResponse({ status: 201, description: 'Actor created.' })
  @Post()
  public async create(@Body() dto: CreateActorDto): Promise<Actor> {
    return this.actorService.create(dto);
  }

  @ApiResponse({ status: 200, description: 'Actor updated.' })
  @Patch(':id')
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateActorDto,
  ): Promise<Actor> {
    return this.actorService.update(id, dto);
  }

  @ApiResponse({ status: 200, description: 'Actor deleted.' })
  @Delete(':id')
  public async delete(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Actor> {
    return this.actorService.delete(id);
  }

  @ApiResponse({ status: 201, description: 'Movie linked.' })
  @Post(':id/movie')
  public async addMovie(
    @Param('id', ParseUUIDPipe) actorId: string,
    @Body() dto: AddMovieDto,
  ): Promise<Actor> {
    return this.actorService.addMovie(actorId, dto);
  }

  @ApiResponse({ status: 200, description: 'Movie unlinked.' })
  @Delete(':id/movie/:movieId')
  public async removeMovie(
    @Param('id', ParseUUIDPipe) actorId: string,
    @Param('movieId', ParseUUIDPipe) movieId: string,
  ): Promise<Actor> {
    return this.actorService.removeMovie(actorId, movieId);
  }

  @ApiResponse({ status: 200, description: 'Movies listed.' })
  @Get(':id/movie')
  public async getMovies(
    @Param('id', ParseUUIDPipe) actorId: string,
  ): Promise<MovieModel[]> {
    return this.actorService.getMovies(actorId);
  }
}

