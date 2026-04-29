import { Injectable } from '@nestjs/common';

import { CreateActorDto } from './dto/create-actor.dto.js';
import { UpdateActorDto } from './dto/update-actor.dto.js';
import { AddMovieDto } from '../review/dto/add-movie.dto.js';

import { PrismaService, MovieModel, ActorGetPayload } from '../../prisma/prisma.service.js';

@Injectable()
export class ActorService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll(): Promise<Actor[]> {
    return this.prisma.actor.findMany({
      include: {
        movies: true,
      },
    });
  }

  public async findOne(id: string): Promise<Actor> {
    const actor = await this.prisma.actor.findUniqueOrThrow({
      where: { id },
      include: {
        movies: true,
      },
    });

    return actor;
  }

  public async create(dto: CreateActorDto): Promise<Actor> {
    const actor = await this.prisma.actor.create({
      data: dto,
      include: {
        movies: true,
      },
    });

    return actor;
  }

  public async update(id: string, dto: UpdateActorDto): Promise<Actor> {
    const actor = await this.prisma.actor.update({
      where: { id },
      data: dto,
      include: {
        movies: true,
      },
    });

    return actor;
  }

  public async delete(id: string): Promise<Actor> {
    const actor = await this.prisma.actor.delete({
      where: { id },
      include: { movies: true },
    });

    return actor;
  }

  public async addMovie(actorId: string, dto: AddMovieDto): Promise<Actor> {
    await this.prisma.actor.findUniqueOrThrow({ where: { id: actorId } });
    await this.prisma.movie.findUniqueOrThrow({ where: { id: dto.movieId } });

    const alreadyLinked = await this.prisma.actor.count({
      where: {
        id: actorId,
        movies: { some: { id: dto.movieId } },
      },
    });
    if (alreadyLinked > 0) {
      return this.findOne(actorId);
    }

    return await this.prisma.actor.update({
      where: { id: actorId },
      data: { movies: { connect: { id: dto.movieId } } },
      include: { movies: true },
    });
  }

  public async removeMovie(actorId: string, movieId: string): Promise<Actor> {
    await this.prisma.actor.findUniqueOrThrow({ where: { id: actorId } });
    await this.prisma.movie.findUniqueOrThrow({ where: { id: movieId } });

    const linked = await this.prisma.actor.count({
      where: {
        id: actorId,
        movies: { some: { id: movieId } },
      },
    });
    if (linked === 0) {
      return this.findOne(actorId);
    }

    return await this.prisma.actor.update({
      where: { id: actorId },
      data: { movies: { disconnect: { id: movieId } } },
      include: { movies: true },
    });
  }

  public async getMovies(actorId: string): Promise<MovieModel[]> {
    const actor = await this.findOne(actorId);

    return actor.movies;
  }
}

export type Actor = ActorGetPayload<{
  include: { movies: true };
}>;
