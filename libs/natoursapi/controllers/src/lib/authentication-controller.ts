import { Request, Response, NextFunction } from 'express';

import { catchAsync } from '@codebase/natoursapi/utils';
import { User, UserDocument } from '@codebase/natoursapi/models';

export const signup = catchAsync(
  async (
    req: Request,
    res: Response
    // next: NextFunction
  ): Promise<void> => {
    // const { name, email, password, passwordConfirm }: UserDocument = req.body;
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
