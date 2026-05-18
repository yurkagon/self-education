import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';

import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /^image\/(jpeg|png)$/ }),
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 5,
            message: 'File size is too large (max 5MB)',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileService.upload(file);
  }
}
