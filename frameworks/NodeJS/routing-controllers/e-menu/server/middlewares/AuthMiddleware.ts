import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { Request, Response, NextFunction } from "express";

import { AuthService } from "../services";

@Middleware({ type: "before" })
class AuthMiddleware implements ExpressMiddlewareInterface {
  private service = new AuthService();

  public async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization as string;

    if (!token) return next();

    try {
      const user = await this.service.authorize(token);

      req.user = user;
    } catch {}

    return next();
  }
}

export default AuthMiddleware;
