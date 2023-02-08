import { IsString, MinLength, IsOptional } from "class-validator";

class NameDto {
  @IsString()
  @MinLength(3)
  ua: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  en?: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  ru?: string;
}

export default NameDto;
