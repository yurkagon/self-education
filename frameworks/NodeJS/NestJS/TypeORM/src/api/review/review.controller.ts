import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import { ReviewEntity } from './entities/review.entity';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller({
  path: 'review',
})
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  public async findAll(): Promise<ReviewEntity[]> {
    return this.reviewService.findAll();
  }

  @Get(':id')
  public async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ReviewEntity> {
    return this.reviewService.findOne(id);
  }

  @Post()
  public async create(@Body() dto: CreateReviewDto): Promise<ReviewEntity> {
    return this.reviewService.create(dto);
  }

  @Patch(':id')
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateReviewDto,
  ): Promise<ReviewEntity> {
    return this.reviewService.update(id, dto);
  }

  @Delete(':id')
  public async delete(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ReviewEntity> {
    return this.reviewService.delete(id);
  }
}

