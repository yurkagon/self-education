import { Module } from '@nestjs/common';

import { ArtistModule } from './artist/artist.module';
import { FileModule } from './file/file.module';
import { HttpDemoModule } from './http-demo/http-demo.module';
import { StampModule } from './stamp/stamp.module';

@Module({
  imports: [
    ArtistModule,
    FileModule,
    HttpDemoModule,
    StampModule.register({ headline: 'nest-course' }),
  ],
})
export class ApiModule {}

