import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { Genre } from '../entities/movie.entity';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(Genre)
  @IsOptional()
  genre?: Genre;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @IsString()
  url: string;
}

