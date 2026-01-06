abstract class Middleware {
  private nextHandler: Middleware;

  public setNext(handler: Middleware): Middleware {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: string): string {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
  }
}

class AuthMiddleware extends Middleware {
  public handle(request: string): string {
    console.log("AuthMiddleware: Checking authentication");
    return super.handle(request);
  }
}

class RoleMiddleware extends Middleware {
  public handle(request: string): string {
    console.log("RoleMiddleware: Checking role");
    return super.handle(request);
  }
}

function clientCode() {
  const authMiddleware = new AuthMiddleware();
  const roleMiddleware = new RoleMiddleware();

  authMiddleware.setNext(roleMiddleware);

  authMiddleware.handle("request");
}
