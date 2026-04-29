import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';

import { ReviewService } from './review.service.js';
import type { Review } from './review.service.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { UpdateReviewDto } from './dto/update-review.dto.js';

import { AuthGuard } from '../../common/guards/auth.guard.js';
import { UserAgent } from '../../common/decorators/user-agent.decorator.js';

@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token.',
  required: true,
})
@Controller({
  path: 'review',
})
// Auth guard over controller scope
@UseGuards(AuthGuard)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiResponse({ status: 200, description: 'List returned.' })
  @Get()
  public async findAll(): Promise<Review[]> {
    return this.reviewService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Review returned.' })
  @Get(':id')
  public async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Review> {
    return this.reviewService.findOne(id);
  }

  @ApiResponse({ status: 201, description: 'Review created.' })
  @Post()
  // Auth guard over endpoint scope
  // @UseGuards(AuthGuard)
  public async create(@Body() dto: CreateReviewDto, @UserAgent() userAgent: string): Promise<Review> {
    console.log({userAgent});
    return this.reviewService.create(dto);
  }

  @ApiResponse({ status: 200, description: 'Review updated.' })
  @Patch(':id')
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateReviewDto,
  ): Promise<Review> {
    return this.reviewService.update(id, dto);
  }

  @ApiResponse({ status: 200, description: 'Review deleted.' })
  @Delete(':id')
  public async delete(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Review> {
    return this.reviewService.delete(id);
  }
}
