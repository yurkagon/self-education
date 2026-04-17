import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddMovieDto {
  @ApiProperty({
    format: 'uuid',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'Movie id to link to this actor.',
  })
  @IsUUID()
  @IsNotEmpty()
  movieId: string;
}
