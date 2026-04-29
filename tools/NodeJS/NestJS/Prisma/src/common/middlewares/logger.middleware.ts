import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.info(`${req.method} ${req.originalUrl}`);
    if (req.body) {
      console.info(JSON.stringify(req.body, null, 2));
    }

    next();
  }
}
