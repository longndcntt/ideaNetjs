import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  Logger,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const path = req.url;
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.log(
            `${method} ${path} ${Date.now() - now}ms`,
            context.getClass().name,
          ),
        ),
      );
  }
}
