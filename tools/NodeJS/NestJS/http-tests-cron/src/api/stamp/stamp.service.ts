import { Inject, Injectable } from '@nestjs/common';

import { STAMP_OPTIONS, StampModuleOptions } from './stamp.options';

@Injectable()
export class StampService {
  constructor(
    @Inject(STAMP_OPTIONS) private readonly options: StampModuleOptions,
  ) {}

  readStamp() {
    return { headline: this.options.headline };
  }
}
