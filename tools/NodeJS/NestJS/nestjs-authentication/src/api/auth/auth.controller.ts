import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';

import { AuthService } from './auth.service.js';
import { REFRESH_TOKEN_COOKIE } from './auth.constants.js';
import { Cookies } from '../../common/decorators/cookies.decorator.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

import { Authorization } from './decorators/authorization.decorator.js';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.register(res, registerDto);
  }

  @Post('login')
  public async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(res, loginDto);
  }

  @Post('refresh')
  public async refresh(
    @Res({ passthrough: true }) res: Response,
    @Cookies(REFRESH_TOKEN_COOKIE) refreshToken: string,
  ) {
    return this.authService.refresh(res, refreshToken);
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  public logout(@Res({ passthrough: true }) res: Response) {
    this.authService.logout(res);
  }

  @Authorization()
  @Get('me')
  public async me(@Req() req: Request) {
    return req.user;
  }
}
