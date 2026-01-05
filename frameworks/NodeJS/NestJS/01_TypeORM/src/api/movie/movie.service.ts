import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { ILike, Repository, FindManyOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { MovieEntity } from './entities/movie.entity';
import { ActorEntity } from '../actor/entities/actor.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AddActorDto } from './dto/add-actor.dto';
import { ActorService } from '../actor/actor.service';
import { PosterEntity } from './entities/poster.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(PosterEntity)
    private readonly posterRepository: Repository<PosterEntity>,
    @Inject(forwardRef(() => ActorService))
    private readonly actorService: ActorService,
  ) {}

  private readonly movieSelect: (keyof MovieEntity)[] = [
    'id',
    'title',
    'description',
    'isPublished',
    'createdAt',
  ];

  public async findAll(search?: string): Promise<MovieEntity[]> {
    const query: FindManyOptions<MovieEntity> = {};
    if (search) {
      query.where = {
        title: ILike(`%${search}%`),
      };
    }

    query.select = this.movieSelect;
    query.relations = ['actors', 'poster'];

    const movies = await this.movieRepository.find(query);

    return movies;
  }

  public async findOne(id: string): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      select: this.movieSelect,
      relations: ['actors', 'poster'],
    });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  public async create(dto: CreateMovieDto): Promise<MovieEntity> {
    const movie = this.movieRepository.create(dto);

    if (dto.url) {
      const poster = this.posterRepository.create({
        url: dto.url,
      });
      await this.posterRepository.save(poster);
      movie.poster = poster;
    }

    return this.movieRepository.save(movie);
  }

  public async update(id: string, dto: UpdateMovieDto): Promise<MovieEntity> {
    const movie = await this.findOne(id);

    this.movieRepository.merge(movie, dto);

    if (dto.url) {
      if (movie.poster) {
        movie.poster.url = dto.url;
        await this.posterRepository.save(movie.poster);
      } else {
        const poster = this.posterRepository.create({
          url: dto.url,
        });
        await this.posterRepository.save(poster);
      }
    }

    return this.movieRepository.save(movie);
  }

  public async delete(id: string): Promise<MovieEntity> {
    const movie = await this.findOne(id);

    await this.movieRepository.delete(movie);

    return movie;
  }

  public async addActor(movieId: string, dto: AddActorDto): Promise<any> {
    const movie = await this.findOne(movieId);
    const actor = await this.actorService.findOne(dto.actorId);

    if (this.hasActor(movie, actor)) {
      return movie;
    }

    movie.actors.push(actor);

    return this.movieRepository.save(movie);
  }

  public async removeActor(
    movieId: string,
    actorId: string,
  ): Promise<MovieEntity> {
    const movie = await this.findOne(movieId);
    const actor = await this.actorService.findOne(actorId);

    if (!this.hasActor(movie, actor)) {
      return movie;
    }

    movie.actors = movie.actors.filter((a) => a.id !== actor.id);
    return this.movieRepository.save(movie);
  }

  private hasActor(movie: MovieEntity, actor: ActorEntity): boolean {
    return movie.actors.some((a) => a.id === actor.id);
  }
}
