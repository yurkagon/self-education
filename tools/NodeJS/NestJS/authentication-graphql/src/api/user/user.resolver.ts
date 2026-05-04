import { Info, Query, Resolver } from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import type { GraphQLResolveInfo } from 'graphql';

import { Authorization } from '../auth/decorators/authorization.decorator.js';

import { UserModel } from './model/user.model.js';
import { UserService } from './user.service.js';

import { UserRole } from '../../../generated/prisma/client.js';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Authorization(UserRole.USER)
  @Query(() => [UserModel])
  public async getUsers(@Info() info: GraphQLResolveInfo): Promise<UserModel[]> {
    const select = new PrismaSelect(info).value;
    return this.userService.findAll(select);
  }
}
