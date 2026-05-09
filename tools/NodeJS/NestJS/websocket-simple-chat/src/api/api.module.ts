import { Module } from '@nestjs/common';
// import { AuthModule } from './auth/auth.module.js';
// import { UserModule } from './user/user.module.js';
import { ChatModule } from './chat/chat.module.js';

@Module({
  // imports: [AuthModule, UserModule],

  imports: [ChatModule]
})
export class ApiModule {}

