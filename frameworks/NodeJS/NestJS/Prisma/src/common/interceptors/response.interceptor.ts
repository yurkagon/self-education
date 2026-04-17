import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    return next.handle().pipe(
      map((data) => {
        const statusCode = context.switchToHttp().getResponse().statusCode;

        return {
          statusCode,
          message: statusCode < 300 ? 'Success' : 'Error',
          data,
        };
      }),
    );
  }
}
