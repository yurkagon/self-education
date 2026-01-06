import {
  IsString,
  ValidateNested,
  IsNumber,
  IsOptional,
  IsEmpty,
} from "class-validator";

import NameDto from "../NameDto";

export class CreateRestaurantDto implements IRestaurant {
  @ValidateNested()
  name: NameDto;

  @IsString()
  slug: string;

  @IsNumber()
  table_count: number;

  @IsString()
  ownerId: string;

  @IsEmpty()
  _id: string;
}

export class UpdateRestaurantDto implements IRestaurant {
  @ValidateNested()
  @IsOptional()
  name: NameDto;

  @IsString()
  @IsOptional()
  slug: string;

  @IsNumber()
  @IsOptional()
  table_count: number;

  @IsEmpty()
  ownerId: string;

  @IsEmpty()
  _id: string;
}
