import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ActorEntity } from './entities/actor.entity';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { AddMovieDto } from '../review/dto/add-movie.dto';
import { MovieService } from '../movie/movie.service';
import { MovieEntity } from '../movie/entities/movie.entity';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
    @Inject(forwardRef(() => MovieService))
    private readonly movieService: MovieService,
  ) {}

  public async findAll(): Promise<ActorEntity[]> {
    return this.actorRepository.find({
      relations: ['movies'],
    });
  }

  public async findOne(id: string): Promise<ActorEntity> {
    const actor = await this.actorRepository.findOne({
      where: { id },
      relations: ['movies'],
    });
    if (!actor) {
      throw new NotFoundException('Actor not found');
    }

    return actor;
  }

  public async create(dto: CreateActorDto): Promise<ActorEntity> {
    const actor = this.actorRepository.create(dto);

    return this.actorRepository.save(actor);
  }

  public async update(id: string, dto: UpdateActorDto): Promise<ActorEntity> {
    const actor = await this.findOne(id);

    this.actorRepository.merge(actor, dto);

    return this.actorRepository.save(actor);
  }

  public async delete(id: string): Promise<ActorEntity> {
    const actor = await this.findOne(id);

    await this.actorRepository.delete(id);

    return actor;
  }

  public async addMovie(actorId: string, dto: AddMovieDto): Promise<any> {
    const actor = await this.findOne(actorId);
    const movie = await this.movieService.findOne(dto.movieId);
    if (this.hasMovie(actor, movie)) {
      return actor;
    }

    actor.movies.push(movie);
    return this.actorRepository.save(actor);
  }

  public async removeMovie(actorId: string, movieId: string): Promise<any> {
    const actor = await this.findOne(actorId);
    const movie = await this.movieService.findOne(movieId);
    if (!this.hasMovie(actor, movie)) {
      return actor;
    }

    actor.movies = actor.movies.filter((m) => m.id !== movie.id);
    return this.actorRepository.save(actor);
  }

  public async getMovies(actorId: string): Promise<MovieEntity[]> {
    const actor = await this.findOne(actorId);

    return actor.movies;
  }

  private hasMovie(actor: ActorEntity, movie: MovieEntity): boolean {
    return actor.movies.some((m) => m.id === movie.id);
  }
}
