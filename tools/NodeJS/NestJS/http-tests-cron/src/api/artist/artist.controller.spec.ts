jest.mock('./artist.service', () => ({
  ArtistService: class ArtistService {},
}));

import { randomUUID } from 'node:crypto';

import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

const artist = { id: randomUUID(), name: 'Artist 1', genre: 'Genre 1' };

describe('ArtistController', () => {
  let controller: ArtistController;
  let service: {
    findAll: jest.Mock;
    findOne: jest.Mock;
    create: jest.Mock;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistController],
      providers: [
        {
          provide: ArtistService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([artist]),
            findOne: jest.fn().mockResolvedValue(artist),
            create: jest.fn().mockResolvedValue(artist),
          },
        },
      ],
    }).compile();

    controller = module.get(ArtistController);
    service = module.get(ArtistService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should return all artists', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([artist]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one artist', async () => {
    const result = await controller.findOne(artist.id);
    expect(result).toEqual(artist);
  });

  it('should throw an error if the artist is not found', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockRejectedValue(new NotFoundException('Artist not found'));

    await expect(controller.findOne(artist.id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should create an artist', async () => {
    const result = await controller.create({
      name: 'Artist 2',
      genre: 'Genre 2',
    });
    expect(result).toEqual(artist);
    expect(service.create).toHaveBeenCalledWith({
      name: 'Artist 2',
      genre: 'Genre 2',
    });
  });
});
