import { Injectable } from '@nestjs/common';

import { CreateMovieDto } from './dto/create-movie.dto.js';
import { UpdateMovieDto } from './dto/update-movie.dto.js';
import { AddActorDto } from './dto/add-actor.dto.js';

import {
  MovieGetPayload,
  MovieSelect,
  PrismaService,
} from '../../prisma/prisma.service.js';

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll(search?: string): Promise<Movie[]> {
    const movies = await this.prisma.movie.findMany({
      where: {
        title: {
          contains: search,
        },
      },
      select: movieSelect,
    });

    return movies;
  }

  public async findOne(id: string): Promise<Movie> {
    const movie = await this.prisma.movie.findUniqueOrThrow({
      where: { id },
      select: movieSelect,
    });

    return movie;
  }

  public async create(dto: CreateMovieDto): Promise<Movie> {
    const { url, ...movieData } = dto;

    return this.prisma.movie.create({
      data: {
        ...movieData,
        ...(url
          ? {
              poster: {
                // or connect: { id: existingPosterId }
                create: { url },
              },
            }
          : {}),
      },
      select: movieSelect,
    });
  }

  public async update(id: string, dto: UpdateMovieDto): Promise<Movie> {
    const { url, ...movieData } = dto;

    const movie = await this.prisma.movie.update({
      where: { id },
      data: {
        ...movieData,
        ...(url
          ? {
              poster: {
                upsert: {
                  create: { url },
                  update: { url },
                },
              },
            }
          : {}),
      },
      select: movieSelect,
    });

    return movie;
  }

  public async delete(id: string): Promise<Movie> {
    return await this.prisma.movie.delete({
      where: { id },
      select: movieSelect,
    });
  }

  public async addActor(
    movieId: string,
    dto: AddActorDto,
  ): Promise<Movie> {
    await this.prisma.movie.findUniqueOrThrow({ where: { id: movieId } });
    await this.prisma.actor.findUniqueOrThrow({ where: { id: dto.actorId } });

    const alreadyLinked = await this.prisma.movie.count({
      where: {
        id: movieId,
        actors: { some: { id: dto.actorId } },
      },
    });
    if (alreadyLinked > 0) {
      return this.findOne(movieId);
    }

    return this.prisma.movie.update({
      where: { id: movieId },
      data: {
        actors: {
          connect: { id: dto.actorId },
        },
      },
      select: movieSelect,
    });
  }

  public async removeActor(
    movieId: string,
    actorId: string,
  ): Promise<Movie> {
    await this.prisma.movie.findUniqueOrThrow({ where: { id: movieId } });
    await this.prisma.actor.findUniqueOrThrow({ where: { id: actorId } });

    return this.prisma.movie.update({
      where: { id: movieId },
      data: { actors: { disconnect: { id: actorId } } },
      select: movieSelect,
    });
  }
}

const movieSelect: MovieSelect = {
  id: true,
  title: true,
  description: true,
  isPublished: true,
  createdAt: true,
  actors: {
    select: {
      id: true,
      name: true,
    },
  },
  poster: {
    select: {
      url: true,
    },
  },
  reviews: {
    select: {
      rating: true,
      text: true,
    },
  },
};

export type Movie = MovieGetPayload<{
  select: typeof movieSelect;
}>;
