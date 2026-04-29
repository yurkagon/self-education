import {
  IsEmail,
  IsString,
  MinLength,
  IsEmpty,
  IsOptional,
} from "class-validator";

export class SignInDto implements ISignInData {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

export class SignUpDto implements ISignUpData, IUser {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  phone: string;

  @IsString()
  @MinLength(3)
  first_name: string;

  @IsString()
  @MinLength(3)
  last_name: string;

  @IsEmpty()
  isVerified: boolean;

  @IsEmpty()
  _id: string;

  @IsEmpty()
  role: IRole;

  @IsEmpty()
  createdAt: any;

  @IsEmpty()
  updatedAt: any;
}

export class UpdateProfileDto implements IUser {
  @IsString()
  @MinLength(3)
  @IsOptional()
  first_name: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  last_name: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsEmpty()
  isVerified: undefined;

  @IsEmpty()
  email: undefined;

  @IsEmpty()
  _id: undefined;

  @IsEmpty()
  password: undefined;

  @IsEmpty()
  role: undefined;

  @IsEmpty()
  createdAt: undefined;

  @IsEmpty()
  updatedAt: undefined;
}
