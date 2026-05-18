import { Injectable, NotFoundException } from '@nestjs/common';

import type { Artist } from '../../../generated/prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import type { CreateArtistDto } from './dto/artist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Artist[]> {
    return this.prisma.artist.findMany();
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  async create(dto: CreateArtistDto): Promise<Artist> {
    return this.prisma.artist.create({
      data: { name: dto.name, genre: dto.genre },
    });
  }
}
