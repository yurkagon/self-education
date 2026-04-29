import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  Max,
  IsEmpty,
} from "class-validator";

export class CreateFeedbackDto implements IFeedback {
  @IsString()
  restaurantId: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  mark: number;

  @IsString()
  feedback: string;

  @IsEmpty()
  _id: string;

  @IsEmpty()
  createdAt: string;
}

export class UpdateFeedbackDto implements IFeedback {
  @IsNumber()
  @IsOptional()
  mark: number;

  @IsString()
  @IsOptional()
  feedback: string;

  @IsEmpty()
  createdAt: string;

  @IsEmpty()
  restaurantId: string;

  @IsEmpty()
  _id: string;
}
