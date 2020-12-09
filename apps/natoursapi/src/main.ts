import express from 'express';
import { Application, Request, Response } from 'express';
import morgan from 'morgan';

import { tourRouter, userRouter } from '@codebase/natoursapi/routes';

const app: Application = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CUSTOM MIDDLEWARE
app.use((req: Request, res: Response, next): void => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTERS
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// -----------------------------SERVER
const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
