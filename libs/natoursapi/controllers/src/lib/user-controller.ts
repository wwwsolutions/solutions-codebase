/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '@codebase/natoursapi/utils';
import { User } from '@codebase/natoursapi/models';

export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // EXECUTE QUERY
    const users = await User.find();

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: { users },
    });
  }
);

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};
