import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import type { GraphqlContext } from '../../../common/interfaces/graphql-context.interface.js';

import type { User } from '../../user/user.service.js';

export const AuthorizedUser = createParamDecorator(
  (
    data: keyof User | undefined,
    context: ExecutionContext,
  ): User | User[keyof User] | undefined => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext<GraphqlContext>().req;
    const user = request.user as User | undefined;

    return data !== undefined ? user?.[data] : user;
  },
);
