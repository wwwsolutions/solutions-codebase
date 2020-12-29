import { Request, Response, NextFunction } from 'express';

import { User } from '@codebase/natoursapi/models';
import { catchAsync } from '@codebase/natoursapi/utils';

export const signUp = catchAsync(
  async (
    req: Request,
    res: Response
    // next: NextFunction
  ) => {
    const newUser = await User.create(req.body);
    res.status(201).json({ status: 'success', data: { user: newUser } });
  }
);

// export const getUsers = (req: Request, res: Response) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This user is not yet defined.',
//   });
// };

// export const getUser = (req: Request, res: Response) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This user is not yet defined.',
//   });
// };

// export const createUser = (req: Request, res: Response) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This user is not yet defined.',
//   });
// };

// export const deleteUser = (req: Request, res: Response) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This user is not yet defined.',
//   });
// };

// export const updateUser = (req: Request, res: Response) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This user is not yet defined.',
//   });
// };
