import { Request, Response } from 'express';
import { HttpException } from '@codebase/shared/exceptions';
import { environment } from '@codebase/shared/environments';

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new HttpException(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new HttpException(message, 400);
};
const handleValidationErrorDB = (err) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errors = Object.values<any>(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new HttpException(message, 400);
};

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
    console.error('ERROR 💥', err);

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
  err,
  req: Request,
  res: Response
  // next: NextFunction
): void => {
  console.log('Hello form errorMiddleware');

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (!environment.production) {
    sendErrorDev(err, res);

    // PRODUCTION
  } else {
    let error = { ...err };

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};
