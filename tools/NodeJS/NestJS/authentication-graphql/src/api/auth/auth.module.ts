import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module.js';

import { AuthService } from './auth.service.js';
import { AuthResolver } from './auth.resolver.js';

import { AuthGuard, RoleGuard } from './decorators/authorization.decorator.js';

import { JwtStrategy } from './strategies/jwt.strategy.js';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: { algorithm: 'HS256' },
        ignoreExpiration: false,
      }),
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    AuthGuard,
    RoleGuard,
  ],
  exports: [AuthGuard, RoleGuard],
})
export class AuthModule {}
