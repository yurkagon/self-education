import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ReviewEntity } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
  ) {}

  public async findAll(): Promise<ReviewEntity[]> {
    return this.reviewRepository.find({
      relations: ['movie'],
    });
  }

  public async findOne(id: string): Promise<ReviewEntity> {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['movie'],
    });
    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  public async create(dto: CreateReviewDto): Promise<ReviewEntity> {
    const review = this.reviewRepository.create(dto);

    return this.reviewRepository.save(review);
  }

  public async update(
    id: string,
    dto: UpdateReviewDto,
  ): Promise<ReviewEntity> {
    const review = await this.findOne(id);

    this.reviewRepository.merge(review, dto);

    return this.reviewRepository.save(review);
  }

  public async delete(id: string): Promise<ReviewEntity> {
    const review = await this.findOne(id);

    await this.reviewRepository.delete(id);

    return review;
  }
}

