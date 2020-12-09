import { Router, Request, Response } from 'express';

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

export const userRouter = Router();
userRouter.route('/').get(getUsers).post(createUser);
userRouter.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);
