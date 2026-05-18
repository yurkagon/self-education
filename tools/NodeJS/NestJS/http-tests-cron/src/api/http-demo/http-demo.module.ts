import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { HttpDemoController } from './http-demo.controller';
import { HttpDemoService } from './http-demo.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://jsonplaceholder.typicode.com',
      timeout: 8000,
      maxRedirects: 3,
      headers: { Accept: 'application/json' },
    }),
  ],
  controllers: [HttpDemoController],
  providers: [HttpDemoService],
})
export class HttpDemoModule {}
