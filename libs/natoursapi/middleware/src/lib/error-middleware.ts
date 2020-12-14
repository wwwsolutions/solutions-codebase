import { Request, Response } from 'express';
import { HttpException } from '@codebase/shared/exceptions';

// export function errorMiddleware(
//   error: HttpException,
//   request: Request,
//   response: Response,
//   next: NextFunction
// ) {
//   const status = error.status || 500;
//   const message = error.message || 'Something went wrong';
//   response.status(status).send({
//     status,
//     message,
//   });
// }

export function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response
  // next: NextFunction
) {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  response.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
}
