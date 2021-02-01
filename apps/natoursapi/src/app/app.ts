// import path from 'path';
import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { tourRouter, userRouter } from '@codebase/natoursapi/routes';
import { errorMiddleware } from '@codebase/natoursapi/middleware';
import { HttpException } from '@codebase/shared/exceptions';

import { environment } from '@codebase/shared/environments';

const app: Application = express();

// declare global {
//   namespace Express {
//     interface Request {
//       token: any;
//       requestTime: any;
//       user?: any;
//     }

//     interface Response {
//       token: any;
//       requestTime: any;
//     }

//     // interface AuthenticatedRequest extends Request {
//     //   user: any;
//     // }

//     // interface UnauthenticatedRequest extends Request {
//     //   user?: undefined;
//     // }
//   }
// }

// GLOBAL MIDDLEWARE
//--------------------------------------------------------------------------------------------------

// apply logging in development
if (!environment.production) {
  app.use(morgan('dev'));
}

// generate global instance of rate limiter
const globalLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: `To many requests from this IP, please try again in an hour!`,
});

// apply rate limiter in production
// if (environment.production) {
//   app.use('/api', globalLimiter);
// }
app.use('/api', globalLimiter);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// SERVE STATIC FILES TODO:
// app.use(express.static(path.join(__dirname, '/dist/natoursapi')));
// console.log(path.join(__dirname, ''));

app.use((req: Request, res: Response, next: NextFunction) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTING
//--------------------------------------------------------------------------------------------------

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// INVALID ROUTE > THROW EXCEPTION
app.all('*', (req: Request, res: Response, next: NextFunction): void => {
  next(new HttpException(`Can't find ${req.originalUrl} on this server!`, 404));
});

// ERROR HANDLING MIDDLEWARE
app.use(errorMiddleware);

export default app;
