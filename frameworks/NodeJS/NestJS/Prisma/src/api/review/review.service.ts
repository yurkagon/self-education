import { Injectable } from '@nestjs/common';

import { CreateReviewDto } from './dto/create-review.dto.js';
import { UpdateReviewDto } from './dto/update-review.dto.js';

import {
  PrismaService,
  ReviewGetPayload,
  ReviewSelect,
} from '../../prisma/prisma.service.js';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll(): Promise<Review[]> {
    return this.prisma.review.findMany({
      select: reviewSelect,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  public async findOne(id: string): Promise<Review> {
    return this.prisma.review.findUniqueOrThrow({
      where: { id },
      select: reviewSelect,
    });
  }

  public async create(dto: CreateReviewDto): Promise<Review> {
    const { movieId, ...data } = dto;

    return this.prisma.review.create({
      data: {
        ...data,
        movie: { connect: { id: movieId } },
      },
      select: reviewSelect,
    });
  }

  public async update(id: string, dto: UpdateReviewDto): Promise<Review> {
    const { movieId, ...data } = dto;

    return this.prisma.review.update({
      where: { id },
      data: {
        ...data,
        ...(movieId !== undefined
          ? { movie: { connect: { id: movieId } } }
          : {}),
      },
      select: reviewSelect,
    });
  }

  public async delete(id: string): Promise<Review> {
    return this.prisma.review.delete({
      where: { id },
      select: reviewSelect,
    });
  }
}

const reviewSelect: ReviewSelect = {
  id: true,
  rating: true,
  text: true,
  movieId: true,
  createdAt: true,
  updatedAt: true,
  movie: true,
};

export type Review = ReviewGetPayload<{
  select: typeof reviewSelect;
}>;
