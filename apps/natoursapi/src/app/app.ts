import path from 'path';
import express from 'express';
import { Application } from 'express';
import morgan from 'morgan';

import { tourRouter, userRouter } from '@codebase/natoursapi/routes';

const app: Application = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// SERVE STATIC FILES TODO:
// app.use(express.static(path.join(__dirname, '/dist/natoursapi')));
// console.log(path.join(__dirname, ''));

// ROUTING
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;
