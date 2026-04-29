import {
  IsString,
  IsNumber,
  ValidateNested,
  IsOptional,
  IsBoolean,
  Min,
  IsEmpty,
} from "class-validator";
import NameDto from "../NameDto";

export class CreateDishDto implements IDish {
  @ValidateNested()
  name: NameDto;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  description: string;

  @IsString()
  restaurantId: string;

  @IsBoolean()
  @IsOptional()
  disabled: boolean;

  @IsOptional()
  @IsString({ each: true })
  images: string[];

  @IsEmpty()
  _id: string;

  @IsEmpty()
  ownerId: string;
}

export class UpdateDishDto implements IDish {
  @ValidateNested()
  @IsOptional()
  name: NameDto;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  disabled: boolean;

  @IsString({ each: true })
  @IsOptional()
  images: string[];

  @IsEmpty()
  restaurantId: string;

  @IsEmpty()
  _id: string;

  @IsEmpty()
  ownerId: string;
}
