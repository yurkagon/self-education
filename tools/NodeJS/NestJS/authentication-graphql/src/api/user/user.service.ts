import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service.js';

import type { UserModel as PrismaUser } from '../../prisma/prisma.service.js';
import type { Prisma } from '../../../generated/prisma/client.js';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(data: CreateUserData) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    return this.prismaService.user.create({ data });
  }

  public async findAll(
    prismaSelect?: Prisma.UserFindManyArgs,
  ): Promise<User[]> {
    const args: Prisma.UserFindManyArgs = prismaSelect ?? { select: userSelect };
    if (args.select) {
      delete (args.select as Record<string, unknown>).password;
    }

    return this.prismaService.user.findMany(args) as Promise<User[]>;
  }

  public async findByEmail(email: string): Promise<UserWithPassword | null> {
    return this.prismaService.user.findUnique({
      where: { email },
      select: {
        ...userSelect,
        password: true,
      },
    });
  }

  public async findById(id: string): Promise<UserWithPassword> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        ...userSelect,
        password: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}

const userSelect = {
  id: true,
  email: true,
  name: true,
  createdAt: true,
  updatedAt: true,
  role: true,
};

export type User = Pick<PrismaUser, keyof typeof userSelect>;

export type UserWithPassword = PrismaUser;

export type CreateUserData = {
  name: string;
  email: string;
  password: string;
};
