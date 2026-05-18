import { Controller, Get } from '@nestjs/common';

import { StampService } from './stamp.service';

@Controller('stamp')
export class StampController {
  constructor(private readonly stamp: StampService) {}

  @Get()
  getStamp() {
    return this.stamp.readStamp();
  }
}
