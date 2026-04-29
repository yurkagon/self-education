import { IsUUID, IsNotEmpty } from 'class-validator';

export class AddActorDto {
  @IsUUID()
  @IsNotEmpty()
  actorId: string;
}

