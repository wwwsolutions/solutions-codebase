import { Request, Response } from 'express';
import { HttpException } from '@codebase/shared/exceptions';
import { environment } from '@codebase/shared/environments';

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other error: don't leak details to the client
  } else {
    // LOG ERROR
    console.error('ERROR', err);

    // SEND GENERIC MESSAGE
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

export const errorMiddleware = (
  err: HttpException,
  req: Request,
  res: Response
  // next: NextFunction
) => {
  console.log('Hello form errorMiddleware');
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (!environment.production) {
    sendErrorDev(err, res);
  } else {
    sendErrorProd(err, res);
  }
};
