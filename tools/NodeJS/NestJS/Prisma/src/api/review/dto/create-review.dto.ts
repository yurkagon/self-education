import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsNotEmpty,
  IsString,
  Min,
  Max,
  IsUUID,
} from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    minimum: 0,
    maximum: 10,
    example: 8.5,
    description: 'Score from 0 to 10.',
  })
  @IsNumber()
  @Min(0)
  @Max(10)
  @IsNotEmpty()
  rating: number;

  @ApiProperty({
    example: 'Thought-provoking and visually stunning.',
    description: 'Review text.',
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    format: 'uuid',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'Movie this review belongs to.',
  })
  @IsUUID()
  @IsNotEmpty()
  movieId: string;
}
