import { Request, Response, NextFunction } from "express";
import {
  InternalServerError,
  ExpressMiddlewareInterface,
  Middleware,
} from "routing-controllers";

import HttpStatus from "http-status-codes";
import path from "path";

@Middleware({ type: "after" })
class WebMiddleware implements ExpressMiddlewareInterface {
  private htmlPath: string = path.resolve(__dirname, "../../build/200.html");

  public use(req: Request, res: Response, next: NextFunction) {
    if (!res.headersSent) {
      return this.handleResponse(res);
    }

    return next();
  }

  private async handleResponse(res: Response) {
    try {
      return await new Promise((resolve, reject) =>
        res.sendFile(this.htmlPath, (error) => {
          if (error) {
            return reject(new InternalServerError("Cannot get root html file"));
          }

          return resolve();
        })
      );
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  }
}

export default WebMiddleware;
