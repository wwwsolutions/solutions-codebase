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

const sendErrorProd = (err, res: Response): void => {
  const { isOperational, statusCode, status, message } = err;

  if (isOperational) {
    res.status(statusCode).json({ status, message }); // OPERATIONAL ERROR, SEND FULL MESSAGE
  } else {
    // TODO: find & use external logging lib
    console.error('💥 💥 💥 ERROR:', err); // LOG ERROR
    const status = `error`;
    const message = `Something went very wrong!`;
    res.status(500).json({ status, message }); // SEND GENERIC MESSAGE
  }
};

const sendErrorDev = (err, res: Response) => {
  const { status, message, stack } = err;
  const error = err;
  res.status(err.statusCode).json({ error, status, message, stack });
};

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (!environment.production) {
    sendErrorDev(err, res); // DEVELOPMENT, SEND UNFILTERED ERRORS
  } else {
    let error = { ...err };
    const { name, code } = error;

    // FILTER AND HANDLE ERRORS
    if (name === 'CastError') error = handleCastErrorDB(error);
    if (name === 'ValidationError') error = handleValidationErrorDB(error);
    if (code === 11000) error = handleDuplicateFieldsDB(error);

    sendErrorProd(error, res); // PRODUCTION, SEND FILTERED ERRORS
  }
};
