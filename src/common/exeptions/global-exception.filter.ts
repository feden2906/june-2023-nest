import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus;
    let messages: string | string[];
    if (exception instanceof HttpException) {
      status = (exception as HttpException).getStatus();
      messages = (exception as any).response?.message ?? exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      messages = (exception as any).message;
    }

    messages = Array.isArray(messages) ? messages : [messages];

    Logger.error(
      messages,
      (exception as any).stack,
      `${request.method} ${request.url}`,
    );

    response.status(status).json({
      statusCode: status,
      messages,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
