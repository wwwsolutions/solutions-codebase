/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '@codebase/natoursapi/utils';
import { User } from '@codebase/natoursapi/models';

// @desc    Get all users
// @route   POST /api/users
// @access  Public
export const getAllUsersController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: { users },
    });
  }
);

export const getUserController = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

export const createUserController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

export const deleteUserController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

export const updateUserController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};
