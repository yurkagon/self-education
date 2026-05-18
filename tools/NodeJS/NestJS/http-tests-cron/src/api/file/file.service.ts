import { Injectable } from '@nestjs/common';
import type { Express } from 'express';
import * as fs from 'node:fs';
import * as path from 'node:path';

@Injectable()
export class FileService {
  upload(file: Express.Multer.File) {
    const uploadDir = path.join(process.cwd(), 'uploads');
    const filePath = path.join(uploadDir, file.originalname);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    fs.writeFileSync(filePath, file.buffer);

    return { path: filePath };
  }
}
