import { Request, Response } from 'express';
import { HttpException } from '@codebase/shared/exceptions';

export const errorMiddleware = (
  err: HttpException,
  request: Request,
  response: Response
  // next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  response.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
