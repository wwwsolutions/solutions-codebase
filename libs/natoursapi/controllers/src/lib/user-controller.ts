/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

import { catchAsync } from '@codebase/natoursapi/utils';
import { User } from '@codebase/natoursapi/models';
import { HttpException } from '@codebase/shared/exceptions';

// HELPERS
//--------------------------------------------------------------------------------------------------

const filterObj = (obj: Request, allowedFields: string[]): unknown => {
  const newObject = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObject[el] = obj[el];
  });
  return newObject;
};

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

// @desc    Update user data
// @route   POST /api/users/updateMe
// @access  Private/User
export const updateMeController = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // user sends password data?
    if (req.body.password || req.body.passwordConfirm) {
      // generate error
      return next(
        new HttpException(
          `This route is not for password update, please use 'updateMyPassword route.'.`,
          400
        )
      ); // BAD REQUEST
    }

    // filer body
    const filteredUserDataFromBody = filterObj(req.body, ['name', 'email']);

    // update user document
    // we are not updating password related properties so we CAN use 'findByIdAndUpdate()'
    const updatedUser = await User.findByIdAndUpdate(
      req.body.user.id,
      filteredUserDataFromBody,
      { new: true, runValidators: true }
    );

    // send updated user data to the client
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  }
);

// @desc    Delete user / set data as inactive
// @route   POST /api/users/deleteMe
// @access  Private/User
export const deleteMeController = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // set active flag to false
    await User.findByIdAndUpdate(req.body.user.id, { active: false });

    // send response
    res.status(204).json({
      status: 'success',
      data: null,
    }); // RESOURCE DELETED
  }
);

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
