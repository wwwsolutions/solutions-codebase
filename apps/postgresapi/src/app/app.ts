import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

import { environment } from '@codebase/shared/environments';
import { errorMiddleware } from '@codebase/postgresapi/middleware';
import { HttpException } from '@codebase/shared/exceptions';
import { courseRouter, lessonRouter } from '@codebase/postgresapi/routes';

const app: Application = express();

if (!environment.production) {
  app.use(morgan('dev'));
}

// CONFIG

// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// ROUTING
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/lessons', lessonRouter);

// Default route handler, in case of all routes unresolved. Always last
app.all('*', (req: Request, res: Response, next: NextFunction): void => {
  next(new HttpException(`Can't find ${req.originalUrl} on this server!`, 404));
});

// GLOBAL ERROR HANDLER
app.use(errorMiddleware);

export default app;
