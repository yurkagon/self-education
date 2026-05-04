import { Module, forwardRef } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module.js';

import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
