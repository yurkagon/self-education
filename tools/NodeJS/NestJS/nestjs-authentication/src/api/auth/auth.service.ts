import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import type { CookieOptions, Response } from 'express';
import type { StringValue } from 'ms';
import ms from 'ms';

import { UserService } from '../user/user.service.js';

import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from './auth.constants.js';
import { JWTAccessTokenPayload } from './auth.interfaces.js';

@Injectable()
export class AuthService {
  private readonly JWT_EXPIRATION_TIME: StringValue;
  private readonly JWT_REFRESH_EXPIRATION_TIME: StringValue;

  private readonly COOKIE_DOMAIN: string;

  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_EXPIRATION_TIME = this.configService.getOrThrow<StringValue>(
      'JWT_EXPIRATION_TIME',
    );
    this.JWT_REFRESH_EXPIRATION_TIME =
      this.configService.getOrThrow<StringValue>('JWT_REFRESH_EXPIRATION_TIME');

    this.COOKIE_DOMAIN = this.configService.getOrThrow<string>('COOKIE_DOMAIN');
  }

  public async register(res: Response, registerDto: RegisterDto) {
    const { password, ...userData } = registerDto;
    const hashedPassword = await hash(password);

    const user = await this.userService.create({
      ...userData,
      password: hashedPassword,
    });

    const { accessToken, refreshToken } = await this.generateTokens(user.id);
    this.setAuthCookies(res, accessToken, refreshToken);

    return {
      user: {
        ...user,
        password: undefined,
      },
    };
  }

  public async login(res: Response, loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await verify(user.password, loginDto.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { accessToken, refreshToken } = await this.generateTokens(user.id);
    this.setAuthCookies(res, accessToken, refreshToken);

    return {
      user: {
        ...user,
        password: undefined,
      },
    };
  }

  public async refresh(
    res: Response,
    refreshToken: string | undefined,
  ): Promise<void> {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    let payload: JWTAccessTokenPayload;
    try {
      payload =
        await this.jwtService.verifyAsync<JWTAccessTokenPayload>(refreshToken);
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.userService.findById(payload.userId);

    const { accessToken, refreshToken: newRefreshToken } =
      await this.generateTokens(user.id);

    this.setAuthCookies(res, accessToken, newRefreshToken);
  }

  public logout(res: Response): void {
    this.clearAuthCookies(res);
  }

  private async generateTokens(userId: string) {
    const payload: JWTAccessTokenPayload = { userId };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: this.JWT_EXPIRATION_TIME,
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: this.JWT_REFRESH_EXPIRATION_TIME,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  private setAuthCookies(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ): void {
    const cookieOptions = this.getAuthCookieOptions();

    res.cookie(ACCESS_TOKEN_COOKIE, accessToken, {
      ...cookieOptions,
      maxAge: ms(this.JWT_EXPIRATION_TIME),
    });
    res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
      ...cookieOptions,
      maxAge: ms(this.JWT_REFRESH_EXPIRATION_TIME),
    });
  }

  private clearAuthCookies(res: Response): void {
    const cookieOptions = this.getAuthCookieOptions();

    res.clearCookie(ACCESS_TOKEN_COOKIE, cookieOptions);
    res.clearCookie(REFRESH_TOKEN_COOKIE, cookieOptions);
  }

  private getAuthCookieOptions(): CookieOptions {
    return {
      // Scope: entire site under this host (must match on clear).
      path: '/',
      // No document.cookie on JS
      httpOnly: true,
      // HTTPS only in production (localhost can stay HTTP in dev when sameSite is lax).
      secure: process.env.NODE_ENV === 'production',
      // e.g. .example.com for subdomains; must match the host that set the cookie.
      domain: this.COOKIE_DOMAIN,
      // none in prod = credentialed cross-origin; browsers require secure with none.
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    };
  }
}
