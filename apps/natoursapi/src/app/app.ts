// import path from 'path';
import express from 'express';
import { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { environment } from '@codebase/shared/environments';

import { tourRouter, userRouter } from '@codebase/natoursapi/routes';

const app: Application = express();

if (!environment.production) {
  app.use(morgan('dev'));
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// SERVE STATIC FILES TODO:
// app.use(express.static(path.join(__dirname, '/dist/natoursapi')));
// console.log(path.join(__dirname, ''));

// ROUTING
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
// Default route handler, in case of all routes unresolved. Always last
app.all('*', (req: Request, res: Response): void => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// ERROR HANDLING MIDDLEWARE
app.use((err, req: Request, res: Response, next: NextFunction): void => {
  //xxx
});

export default app;
