import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    // Create a morgan logger instance
    const logger = morgan(':method :url :status :response-time ms ');

    // Use the logger to log the request details
    logger(req, res, (err) => {
      if (err) return next(err);
      next();
    });
  }
}
