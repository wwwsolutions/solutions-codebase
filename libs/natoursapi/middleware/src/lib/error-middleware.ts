/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
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
  // TODO: Ramda candidate pluck()
  const errors = Object.values<any>(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new HttpException(message, 400);
};

const handleJwtError = () =>
  new HttpException(`Invalid token. Please log in again.`, 401); // UNAUTHORIZED

const handleJwtExpiredError = () =>
  new HttpException(`Token has expired. Please log in again.`, 401); // UNAUTHORIZED

const sendErrorDev = (err: any, res: Response) => {
  const { statusCode, status, message, stack } = err;
  const error = err;

  res.status(statusCode).json({ error, status, message, stack });
};

const sendErrorProd = (err, res: Response): void => {
  const { isOperational, statusCode, status, message } = err;

  if (isOperational) {
    res.status(statusCode).json({ status, message }); // OPERATIONAL ERROR, SEND FULL MESSAGE
  } else {
    // TODO: find & use external logging lib
    // LOG ERROR
    console.error('💥 💥 💥 ERROR:', err);

    // SEND GENERIC MESSAGE
    res
      .status(500)
      .json({ status: 'error', message: `Something went very wrong!` });
  }
};

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { isOperational, statusCode, status, message } = err;
  err.statusCode = statusCode || 500;
  err.status = status || 'error';

  if (!environment.production) {
    sendErrorDev(err, res); // DEVELOPMENT, SEND UNFILTERED ERRORS
  } else {
    let error = { ...err };

    // FILTER AND HANDLE ERRORS
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.code === 'JsonWebTokenError') error = handleJwtError();
    if (error.code === 'TokenExpiredError') error = handleJwtExpiredError();

    sendErrorProd(error, res); // PRODUCTION, SEND FILTERED ERRORS
  }
};
