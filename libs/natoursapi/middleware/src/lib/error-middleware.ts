import { Request, Response } from 'express';
import { HttpException } from '@codebase/shared/exceptions';

export const errorMiddleware = (
  err: HttpException,
  req: Request,
  res: Response
  // next: NextFunction
) => {
  console.log('Hello form errorMiddleware');
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
