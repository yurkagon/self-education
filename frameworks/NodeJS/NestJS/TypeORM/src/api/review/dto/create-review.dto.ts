import {
  IsNumber,
  IsNotEmpty,
  IsString,
  Min,
  Max,
  IsUUID,
} from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @Min(0)
  @Max(10)
  @IsNotEmpty()
  rating: number;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsUUID()
  @IsNotEmpty()
  movieId: string;
}
