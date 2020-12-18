// import path from 'path';
import express from 'express';
import {
  Application,
  // Request,
  // Response,
  // NextFunction
} from 'express';
import morgan from 'morgan';
import { environment } from '@codebase/shared/environments';
// import { errorMiddleware } from '@codebase/natoursapi/middleware';
// import { HttpException } from '@codebase/shared/exceptions';

import { courseRouter } from '@codebase/postgresapi/routes';
// import { CourseModel } from '@codebase/postgresapi/models';
// import { findAllCourses } from '@codebase/postgresapi/queries';

const app: Application = express();

if (!environment.production) {
  app.use(morgan('dev'));
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ROUTING
app.use('/api/v1/courses', courseRouter);
// app.use('/api/v1/lessons', userRouter);

// Default route handler, in case of all routes unresolved. Always last
// app.all('*', (req: Request, res: Response, next: NextFunction): void => {
//   next(new HttpException(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// ERROR HANDLING MIDDLEWARE
// app.use(errorMiddleware);

export default app;
