import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
  ManyToMany,
  OneToOne,
  JoinTable,
  JoinColumn
} from 'typeorm';

import { ActorEntity } from '../../actor/entities/actor.entity';
import { ReviewEntity } from '../../review/entities/review.entity';
import { PosterEntity } from './poster.entity';

export enum Genre {
  ACTION = 'action',
  COMEDY = 'comedy',
  DRAMA = 'drama',
  HORROR = 'horror',
}

@Entity({ name: 'movies' })
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 128,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: Genre,
    nullable: true,
  })
  genre: Genre;

  @Column({ default: false })
  isPublished: boolean;

  @Column({
    type: 'integer',
    nullable: true,
    unsigned: true,
  })
  releaseYear: number;

  @Column({
    type: 'decimal',
    precision: 2, // 2 digits before the decimal point
    scale: 1, // 1 digit after the decimal point
    nullable: true,
    unsigned: true,
    default: 5,
  })
  rating: number;


  @OneToMany(() => ReviewEntity, (review) => review.movie)
  reviews: ReviewEntity[];

  @ManyToMany(() => ActorEntity, (actor) => actor.movies)
  @JoinTable({
    name: 'movie_actors',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'actor_id',
      referencedColumnName: 'id',
    },
  })
  actors: ActorEntity[];

  @OneToOne(() => PosterEntity, (poster) => poster.movie, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  poster: PosterEntity;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
