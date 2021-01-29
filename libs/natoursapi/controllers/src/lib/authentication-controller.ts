/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { promisify } from 'util';
import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '@codebase/natoursapi/utils';
import jwt from 'jsonwebtoken';
import { User, UserDocument } from '@codebase/natoursapi/models';
import { HttpException } from '@codebase/shared/exceptions';
import { environment } from '@codebase/shared/environments';

interface JsonWebToken {
  id: string;
  iat: Date;
  exp: Date;
}

const { secret, expiresIn } = environment.jwt;

const signToken = (id) => {
  return jwt.sign({ id }, secret, { expiresIn });
};

// @desc    Sign up new user & get token
// @route   POST /api/users/signup
// @access  Public
export const signupController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, passwordConfirm } = req.body;

    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    } as UserDocument);

    const token = signToken(newUser._id);

    res.status(201).json({ status: 'success', token, data: { user: newUser } });
  }
);

export const loginController = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

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
    //   const authorization = <string>req.headers.authorization;

    //   // GET TOKEN AND
    //   const token =
    //     authorization && authorization.startsWith('Bearer')
    //       ? authorization.split(' ')[1]
    //       : null;

    //   // CHECK IF TOKEN EXISTS
    //   if (!token) {
    //     return next(
    //       new HttpException(
    //         `Your are not logged in! Please log in to gain access.`,
    //         401
    //       )
    //     ); // UNAUTHORIZED
    //   }

    //   // TOKEN VERIFICATION
    //   const decoded = (await promisify(jwt.verify)(
    //     token,
    //     secret
    //   )) as JsonWebToken;
    //   console.log('decoded', decoded);

    //   // CHECK IF USER STILL EXISTS
    //   const freshUser = (await User.findById(decoded.id)) as UserDocument;

    //   if (!freshUser) {
    //     return next(
    //       new HttpException(
    //         `The user belonging to this token does not longer exist.`,
    //         401
    //       )
    //     ); // UNAUTHORIZED
    //   }

    //   // CHECK IF USER CHANGED PASSWORD AFTER TOKEN WAS ISSUED
    //   freshUser.changedPasswordAfter(decoded.iat);
    //   console.log('freshUser', freshUser);

    //   next();

    // 1) Getting token and check of it's there
    const authorization = <string>req.headers.authorization;

    const token =
      authorization && authorization.startsWith('Bearer')
        ? authorization.split(' ')[1]
        : null;

    if (!token) {
      return next(
        new HttpException(
          'You are not logged in! Please log in to get access.',
          401
        )
      );
    }

    // 2) Verification token
    const decoded = (await jwt.verify(
      token,
      process.env.JWT_SECRET
    )) as JsonWebToken; // TODO: FIX TYPES

    // const decoded = (await promisify(jwt.verify)(
    //   token,
    //   process.env.JWT_SECRET
    // )) as JsonWebToken;

    // 3) Check if user still exists
    const currentUser = (await User.findById(decoded.id)) as UserDocument;
    if (!currentUser) {
      return next(
        new HttpException(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new HttpException(
          'User recently changed password! Please log in again.',
          401
        )
      );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.body.user = currentUser;
    console.log('req.body.user >>>', req.body.user);
    // req.user = currentUser;
    next();
  }
);

export const restrictTo = (...roles) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    console.log('restrictTo = req.body.user :::', req.body.user);
    if (!roles.includes(req.body.user.role)) {
      return next(
        new HttpException(
          `You do not have permission to perform this action.`,
          403
        )
      ); // FORBIDDEN
    }
    next();
  };
};
