import { randomUUID } from 'node:crypto';

import { ArtistService } from './artist.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';

const artist = { id: randomUUID(), name: 'Artist 1', genre: 'Genre 1' };

const db = {
  artist: {
    findMany: jest.fn().mockResolvedValue([artist]),
    findUnique: jest.fn().mockResolvedValue(artist),
    create: jest.fn().mockResolvedValue(artist),
  },
};

describe('ArtistService', () => {
  let service: ArtistService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtistService, { provide: PrismaService, useValue: db }],
    }).compile();
    service = module.get(ArtistService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all artists', async () => {
    const result = await service.findAll();
    expect(result).toEqual([artist]);
  });
});
