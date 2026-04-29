import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsInt,
} from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({ example: 'Inception', description: 'Movie title.' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'A thief who enters dreams.',
    description: 'Synopsis or plot summary.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 2010, description: 'Release year.' })
  @IsInt()
  releaseYear: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Whether the movie is published.',
  })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ApiPropertyOptional({
    example: 'https://example.com/posters/inception.jpg',
    description: 'Poster image URL; creates poster when set.',
  })
  @IsString()
  @IsOptional()
  url?: string;
}
