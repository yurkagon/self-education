import { Controller, Get } from '@nestjs/common';

import { Authorization } from '../auth/decorators/authorization.decorator.js';
import { AuthorizedUser } from '../auth/decorators/authorized-user.decorator.js';

import { type User, UserService } from './user.service.js';

@Authorization()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public getAll(
    @AuthorizedUser() user: User,
    @AuthorizedUser('email') email: string,
  ): Promise<User[]> {
    console.info('Logged in user:', user, 'Email:', email);

    return this.userService.findAll();
  }
}
