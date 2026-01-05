import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { MovieEntity } from '../../movie/entities/movie.entity';

@Entity({ name: 'reviews' })
export class ReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
    name: 'movie_id',
  })
  movieId: string;

  @ManyToOne(() => MovieEntity, (movie) => movie.reviews, {
    // If the movie is deleted, delete the reviews
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'movie_id' })
  movie: MovieEntity;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 2,
    // Converting data from DB to JS and from JS to DB
    transformer: {
      // Converting data when we send it to the DB
      to: (value: number) => value,
      // Converting data when we get it from the DB
      from: (value: string) => parseFloat(value),
    },
  })
  rating: number;

  @Column({
    type: 'text',
  })
  text: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}

