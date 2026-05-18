import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { HttpDemoService } from './http-demo.service';

@Controller('demo/http')
export class HttpDemoController {
  constructor(private readonly httpDemo: HttpDemoService) {}

  @Get('posts/:id')
  async getPost(@Param('id', ParseIntPipe) id: number) {
    return this.httpDemo.fetchPost(id);
  }
}
