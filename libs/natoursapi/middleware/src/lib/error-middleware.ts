/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { HttpException } from '@codebase/shared/exceptions';
import { environment } from '@codebase/shared/environments';

// TYPES
//--------------------------------------------------------------------------------------------------
type DevelopmentError = {
  statusCode: any;
  status: any;
  message: any;
  stack: any;
};
type ProductionError = {
  isOperational: any;
  statusCode: any;
  status: any;
  message: any;
};
type ValidationError = { errors: { [s: string]: any } | ArrayLike<any> };
type CastError = { path: any; value: any };
type DuplicateFieldsError = { errmsg: string };

// ENUMS
//--------------------------------------------------------------------------------------------------
enum JwtErrors {
  TokenError = 'JsonWebTokenError',
  TokenExpired = 'TokenExpiredError',
}

enum MongooseErrors {
  DuplicateFields = 'E11000',
  Cast = 'CastError',
  Validation = 'ValidationError',
}

// ERROR HANDLERS
//--------------------------------------------------------------------------------------------------
const handleCastErrorDB = (err: CastError): HttpException => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new HttpException(message, 400);
};

const handleDuplicateFieldsDB = (err: DuplicateFieldsError): HttpException => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new HttpException(message, 400);
};

const handleValidationErrorDB = (err: ValidationError): HttpException => {
  const errors = Object.values<any>(err.errors).map((el) => el.message); // TODO: Ramda candidate pluck()
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new HttpException(message, 400);
};

const handleJwtError = (): HttpException =>
  new HttpException(`Invalid token. Please log in again.`, 401); // UNAUTHORIZED

const handleJwtExpiredError = (): HttpException =>
  new HttpException(`Token has expired. Please log in again.`, 401); // UNAUTHORIZED

const sendErrorDev = (err: DevelopmentError, res: Response): void => {
  // extract fields from error object
  const { statusCode, status, message, stack } = err;

  // send error with stack trace
  res.status(statusCode).json({ error: err, status, message, stack });
};

const sendErrorProd = (err: ProductionError, res: Response): void => {
  // extract fields from error object
  const { isOperational, statusCode, status, message } = err;

  // is operational error?
  if (isOperational) {
    res.status(statusCode).json({ status, message }); // OPERATIONAL ERROR, SEND FULL MESSAGE
  } else {
    console.error('💥 💥 💥 ERROR:', err); // LOG ERROR

    // send generic error message
    res
      .status(500)
      .json({ status: 'error', message: `Something went very wrong!` });
  }
};

// MIDDLEWARE
//--------------------------------------------------------------------------------------------------
export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response
): void => {
  // extract fields from error object
  const { statusCode, status } = err; // const { isOperational, statusCode, status, message } = err;
  err.statusCode = statusCode || 500;
  err.status = status || 'error';

  // is development?
  if (!environment.production) {
    // send unfiltered errors
    sendErrorDev(err, res);
  } else {
    // make a copy
    // let error = { ...err };

    // filter and handle errors
    // if (error.code === MongooseErrors.DuplicateFields)
    //   error = handleDuplicateFieldsDB(error);
    // if (error.name === MongooseErrors.Cast) error = handleCastErrorDB(error);
    // if (error.name === MongooseErrors.Validation)
    //   error = handleValidationErrorDB(error);
    // if (error.code === JwtErrors.TokenError) error = handleJwtError();
    // if (error.code === JwtErrors.TokenExpired) error = handleJwtExpiredError();

    if (err.code === MongooseErrors.DuplicateFields)
      err = handleDuplicateFieldsDB(err);
    if (err.name === MongooseErrors.Cast) err = handleCastErrorDB(err);
    if (err.name === MongooseErrors.Validation)
      err = handleValidationErrorDB(err);
    if (err.code === JwtErrors.TokenError) err = handleJwtError();
    if (err.code === JwtErrors.TokenExpired) err = handleJwtExpiredError();

    // send filtered errors
    // sendErrorProd(error, res);
    sendErrorProd(err, res);
  }
};
