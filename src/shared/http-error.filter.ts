/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttlpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const errorMessage = {
      code: status,
      timestamp: new Date().toLocaleDateString(),
      method: request.method,
      path: request.url,
      message: exception.message,
    };
    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errorMessage),
      'ExceptionHttp',
    );
    response.status(status).json(errorMessage);
  }
}
