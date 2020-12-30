/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '@codebase/natoursapi/utils';
import * as jwt from 'jsonwebtoken';
import { User, UserDocument } from '@codebase/natoursapi/models';
import { HttpException } from '@codebase/shared/exceptions';
import { environment } from '@codebase/shared/environments';

const { secret, expiresIn } = environment.jwt;

const signToken = (id) => {
  return jwt.sign({ id }, secret, { expiresIn });
};

export const signup = catchAsync(
  async (
    req: Request,
    res: Response
    // next: NextFunction
  ): Promise<void> => {
    const { name, email, password, passwordConfirm } = req.body;

    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    } as UserDocument);

    // const token = jwt.sign({ id: newUser._id }, secret, { expiresIn });
    const token = signToken(newUser._id);

    res.status(201).json({ status: 'success', token, data: { user: newUser } });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;
    const { secret, expiresIn } = environment.jwt;

    // CHECK BODY ::: THERE IS NO email OR NO password IN REQ.BODY?
    if (!email || !password) {
      return next(new HttpException(`Please provide email and password.`, 400)); // BAD REQUEST
    }

    // QUERY DATABASE ::: FIND user + password
    const user = (await User.findOne({ email }).select(
      '+password'
    )) as UserDocument;

    //  CHECK DATABASE RESULT ::: THERE IS NO user OR NO password?
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new HttpException(`Incorrect email or password.`, 401)); // UNAUTHORIZED
    }

    // PASSED ::: SIGN TOKEN AND SEND IT TO THE CLIENT
    const token = signToken(user._id);

    res.status(200).json({
      status: 'success',
      token,
    });
  }
);

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authorization = <string>req.headers.authorization;

    // GET TOKEN AND
    const token =
      authorization && authorization.startsWith('Bearer')
        ? authorization.split(' ')[1]
        : null;

    // CHECK IF TOKEN EXISTS
    if (!token) {
      return next(
        new HttpException(
          `Your are not logged in! Please log in to gain access.`,
          401
        )
      ); // UNAUTHORIZED
    }

    // TOKEN VERIFICATION

    // CHECK IF USER STILL EXISTS

    // CHECK IF USER CHANGED PASSWORD AFTER TOKEN WAS ISSUED

    next();
  }
);
