import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const requestId = uuidv4();
    const errorLog = {
      timestamp: new Date().toISOString(),
      type: 'ERROR',
      requestId,
      method: request.method,
      url: request.url,
      ip: request.ip,
      statusCode: status,
      errorMessage:
        exception instanceof HttpException
          ? exception.message
          : 'Internal Server Error',
    };

    console.error(JSON.stringify(errorLog));

    response.status(status).json({
      statusCode: status,
      message: exception.message || 'Internal Server Error',
    });
  }
}
