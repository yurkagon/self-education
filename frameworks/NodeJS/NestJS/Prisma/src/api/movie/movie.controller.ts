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
import {
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

import { StringLowercasePipe } from '../../common/pipes/string-lowercase.pipe.js';

import { MovieService, Movie } from './movie.service.js';

import { CreateMovieDto } from './dto/create-movie.dto.js';
import { UpdateMovieDto } from './dto/update-movie.dto.js';
import { AddActorDto } from './dto/add-actor.dto.js';


@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token.',
  required: true,
})
@Controller({
  path: 'movie',
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({
    summary: 'List all movies',
    description:
      'Returns the full movie list. Pass an optional search query to narrow results by title.',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Optional filter matched against the movie title.',
  })
  @ApiResponse({ status: 200, description: 'List returned.' })
  @Get()
  public async findAll(@Query('search') search?: string): Promise<Movie[]> {
    return this.movieService.findAll(search);
  }

  @ApiOperation({
    summary: 'Get movie by id',
    description: 'Returns a single movie including its relations for the given UUID.',
  })
  @ApiResponse({ status: 200, description: 'Movie returned.' })
  @Get(':id')
  public async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Movie> {
    return this.movieService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create a movie',
    description:
      'Creates a new movie record. Accepts optional poster metadata in the payload when provided.',
  })
  @ApiResponse({ status: 201, description: 'Movie created.' })
  @Post()
  public async create(@Body() dto: CreateMovieDto): Promise<Movie> {
    return this.movieService.create(dto);
  }

  @ApiOperation({
    summary: 'Update a movie',
    description:
      'Partially updates an existing movie by id. Fields not sent in the body remain unchanged.',
  })
  @ApiResponse({ status: 200, description: 'Movie updated.' })
  @Patch(':id')
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateMovieDto,
  ): Promise<Movie> {
    return this.movieService.update(id, dto);
  }

  @ApiOperation({
    summary: 'Delete a movie',
    description:
      'Permanently removes a movie and its dependent data according to database rules.',
  })
  @ApiResponse({ status: 200, description: 'Movie deleted.' })
  @Delete(':id')
  public async delete(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Movie> {
    return this.movieService.delete(id);
  }

  @ApiOperation({
    summary: 'Attach an actor to a movie',
    description:
      'Links an existing actor to the movie via the join relation. Both ids must be valid UUIDs.',
  })
  @ApiResponse({ status: 201, description: 'Actor attached.' })
  @Post(':id/actor')
  public async addActor(
    @Param('id', ParseUUIDPipe) movieId: string,
    @Body() dto: AddActorDto,
  ): Promise<Movie> {
    return this.movieService.addActor(movieId, dto);
  }

  @ApiOperation({
    summary: 'Detach an actor from a movie',
    description:
      'Removes the association between the movie and the given actor without deleting the actor entity.',
  })
  @ApiResponse({ status: 200, description: 'Actor detached.' })
  @Delete(':id/actor/:actorId')
  public async removeActor(
    @Param('id', ParseUUIDPipe, StringLowercasePipe) movieId: string,
    @Param('actorId', ParseUUIDPipe) actorId: string,
  ): Promise<Movie> {
    return this.movieService.removeActor(movieId, actorId);
  }

  @ApiOperation({
    summary: 'Pipe demo: lowercase title',
    description:
      'Sample endpoint that lowercases the title field from the JSON body using a custom pipe.',
  })
  @ApiResponse({ status: 201, description: 'Echo string.' })
  @Post('test')
  public async test(
    @Body('title', StringLowercasePipe) title: string,
  ): Promise<string> {
    return `Movie: ${title}`;
  }
}
