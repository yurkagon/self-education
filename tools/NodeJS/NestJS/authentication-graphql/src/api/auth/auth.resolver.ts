import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { RegisterInput } from './inputs/register.input.js';
import { LoginInput } from './inputs/login.input.js';
import { REFRESH_TOKEN_COOKIE } from './auth.constants.js';
import { AuthService } from './auth.service.js';
import { AuthorizedUser } from './decorators/authorized-user.decorator.js';
import { Authorization } from './decorators/authorization.decorator.js';
import { AuthResult } from './model/auth-result.model.js';
import type { GraphqlContext } from '../../common/interfaces/graphql-context.interface.js';
import { UserModel } from '../user/model/user.model.js';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResult)
  public async authRegister(
    @Args('data') input: RegisterInput,
    @Context() ctx: GraphqlContext,
  ): Promise<AuthResult> {
    const { user } = await this.authService.register(ctx.res, input);

    return { user };
  }

  @Mutation(() => AuthResult)
  public async authLogin(
    @Args('data') input: LoginInput,
    @Context() ctx: GraphqlContext,
  ): Promise<AuthResult> {
    const { user } = await this.authService.login(ctx.res, input);

    return { user };
  }

  @Mutation(() => Boolean)
  public async authRefresh(@Context() ctx: GraphqlContext): Promise<boolean> {
    const cookie = ctx.req.cookies?.[REFRESH_TOKEN_COOKIE];

    await this.authService.refresh(ctx.res, cookie);

    return true;
  }

  @Mutation(() => Boolean)
  public authLogout(@Context() ctx: GraphqlContext): boolean {
    this.authService.logout(ctx.res);

    return true;
  }

  @Query(() => AuthResult)
  @Authorization()
  public async authMe(@AuthorizedUser() user: UserModel): Promise<AuthResult> {
    return { user };
  }
}
