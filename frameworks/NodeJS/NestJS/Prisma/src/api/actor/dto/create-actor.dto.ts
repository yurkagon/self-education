import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateActorDto {
  @ApiProperty({ example: 'Leonardo DiCaprio', description: 'Actor full name.' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
