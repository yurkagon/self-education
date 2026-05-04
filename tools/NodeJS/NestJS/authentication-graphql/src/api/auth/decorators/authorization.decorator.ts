import type { CanActivate, ExecutionContext } from '@nestjs/common';
import {
  ForbiddenException,
  Injectable,
  SetMetadata,
  UnauthorizedException,
  applyDecorators,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

import { UserRole } from 'generated/prisma/client.js';

import type { GraphqlContext } from '../../../common/interfaces/graphql-context.interface.js';

import type { User } from '../../user/user.service.js';

export const ROLES_KEY = 'authorization:roles';

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {
  public override getRequest(context: ExecutionContext) {
    return GqlExecutionContext.create(context).getContext<GraphqlContext>().req;
  }
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles?.length) {
      return true;
    }

    const request =
      GqlExecutionContext.create(context).getContext<GraphqlContext>().req;
    const user = request.user as User | undefined;

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException();
    }

    return true;
  }
}

export const Authorization = (...roles: UserRole[]) =>
  roles.length
    ? applyDecorators(UseGuards(AuthGuard, RoleGuard), SetMetadata(ROLES_KEY, roles))
    : applyDecorators(UseGuards(AuthGuard));
