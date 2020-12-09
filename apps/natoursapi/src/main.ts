import express from 'express';
import { Application, Request, Response } from 'express';
// import * as express from 'express';

import { tourRouter } from '@codebase/natoursapi/routes';

import morgan from 'morgan';

// FAKE DATA
// import { tours } from './dev-data/data/tours-simple';

//'''''''''''''''''''''''''' USERS ROUTE HANDLERS
const getUsers = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

const getUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

const createUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

const deleteUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

const updateUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

//'''''''''''''''''''''''''' MIDDLEWARE

// app = express();
const app: Application = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CUSTOM MIDDLEWARE
app.use((req: Request, res: Response, next): void => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTERS DECLARATION

const userRouter = express.Router();

// ROUTES

userRouter.route('/').get(getUsers).post(createUser);
userRouter.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);

// MOUNTING ROUTERS
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// -----------------------------SERVER
const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
