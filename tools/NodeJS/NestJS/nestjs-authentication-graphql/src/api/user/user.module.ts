import { Module, forwardRef } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module.js';

import { UserResolver } from './user.resolver.js';
import { UserService } from './user.service.js';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
