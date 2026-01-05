import {
  IsNotEmpty,
  IsUUID,
} from 'class-validator';

export class AddMovieDto {
  @IsUUID()
  @IsNotEmpty()
  movieId: string;
}
