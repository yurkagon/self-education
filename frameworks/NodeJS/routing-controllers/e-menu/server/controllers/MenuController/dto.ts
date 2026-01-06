import { IsString, ValidateNested, IsEmpty } from "class-validator";

import NameDto from "../NameDto";

export class CategoryDto implements ICategory {
  @ValidateNested()
  name: NameDto;

  @IsString({ each: true })
  dishes: string[];

  @IsString()
  _id: string;
}

export class UpdateMenuDto implements IMenu {
  @ValidateNested({ each: true })
  categories: CategoryDto[];

  @IsEmpty()
  _id: string;

  @IsEmpty()
  restaurantId: string;

  @IsEmpty()
  ownerId: string;
}
