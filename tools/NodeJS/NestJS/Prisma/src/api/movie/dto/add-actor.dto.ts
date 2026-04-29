import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class AddActorDto {
  @ApiProperty({
    format: 'uuid',
    example: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    description: 'Existing actor id to link.',
  })
  @IsUUID()
  @IsNotEmpty()
  actorId: string;
}
