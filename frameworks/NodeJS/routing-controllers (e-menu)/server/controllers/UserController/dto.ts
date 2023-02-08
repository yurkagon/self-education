import { IsString, IsOptional, IsEmpty, IsBoolean } from "class-validator";

export class CreateUserDto implements IUser {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: IRole;

  @IsBoolean()
  isVerified: boolean;

  @IsEmpty()
  _id: string;

  @IsEmpty()
  updatedAt: any;

  @IsEmpty()
  createdAt: any;
}

export class UpdateUserDto implements IUser {
  @IsString()
  @IsOptional()
  first_name: string;

  @IsString()
  @IsOptional()
  last_name: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  role: IRole;

  @IsBoolean()
  isVerified: boolean;

  @IsEmpty()
  _id: string;

  @IsEmpty()
  updatedAt: any;

  @IsEmpty()
  createdAt: any;
}
