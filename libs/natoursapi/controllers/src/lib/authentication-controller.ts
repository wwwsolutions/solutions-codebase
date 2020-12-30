/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '@codebase/natoursapi/utils';
import * as jwt from 'jsonwebtoken';
import { User, UserDocument } from '@codebase/natoursapi/models';
import { environment } from '@codebase/shared/environments';

export const signup = catchAsync(
  async (
    req: Request,
    res: Response
    // next: NextFunction
  ): Promise<void> => {
    const { name, email, password, passwordConfirm } = req.body;
    const { secret, expiresIn } = environment.jwt;

    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    } as UserDocument);

    const token = jwt.sign({ id: newUser._id }, secret, { expiresIn });

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
