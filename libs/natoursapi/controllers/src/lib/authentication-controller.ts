// import { promisify } from 'util';
import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { catchAsync, sendEmail } from '@codebase/natoursapi/utils';
import jwt from 'jsonwebtoken';

import { HttpException } from '@codebase/shared/exceptions';
import { ExpressMiddleware } from '@codebase/shared/data-access-models';
import { User, UserDocument } from '@codebase/natoursapi/models';
import { environment } from '@codebase/shared/environments';

// INTERFACES
//--------------------------------------------------------------------------------------------------
interface JsonWebToken {
  id: string;
  iat: Date;
  exp: Date;
}

// TYPES
//--------------------------------------------------------------------------------------------------

const { secret, expiresIn } = environment.jwt;

// HELPERS
//--------------------------------------------------------------------------------------------------

// const signToken = (id: string): string => {
//   return jwt.sign({ id }, secret, { expiresIn });
// };

const signToken = async (id: string): Promise<string> => {
  return jwt.sign({ id }, secret, { expiresIn });
}; // impure function

const verifyToken = async (token: string): Promise<JsonWebToken> => {
  return jwt.verify(token, process.env.JWT_SECRET) as JsonWebToken;
}; // impure function

// CONTROLLERS
//--------------------------------------------------------------------------------------------------

// @desc    Sign up a new user and send a signed token
// @route   POST /api/users/signup
// @access  Public
export const signupController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    // extract fields from request body
    const {
      name,
      email,
      password,
      passwordConfirm,
      role,
      passwordChangedAt,
    } = req.body;

    // create new user
    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
      role,
      passwordChangedAt,
    } as UserDocument);

    // create token
    const token = await signToken(newUser._id);

    // send new user + token
    res.status(201).json({
      status: 'success',
      token,
      data: { user: newUser },
    }); // CREATED
  }
);

// @desc    Log in user and send a signed token
// @route   POST /api/users/login
// @access  Public
export const loginController = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // extract fields from request body
    const { email, password } = req.body;

    // no email OR no password in the body?
    if (!email || !password) {
      return next(new HttpException(`Please provide email and password.`, 400)); // BAD REQUEST
    }

    // find user with password
    const user = (await User.findOne({ email }).select(
      '+password'
    )) as UserDocument;

    // no user OR wrong password?
    if (!user || !(await user.hasCorrectPassword(password, user.password))) {
      return next(new HttpException(`Incorrect email or password.`, 401)); // UNAUTHORIZED
    }

    // sign token
    const token = await signToken(user._id);

    // send token to the client
    res.status(200).json({
      status: 'success',
      token,
    });
  }
);

// @desc    Send generated reset token to user
// @route   POST /api/users/forgotPassword
// @access  Private
export const forgotPasswordController = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // extract email form request body
    const { email } = req.body;

    // get user based on email
    const user = await User.findOne({ email });

    // no user?
    if (!user) {
      // generate error
      return next(
        new HttpException(`There is no user with email address.`, 404)
      ); // NOT FOUND
    }

    // generate random reset token
    const resetToken = user.createPasswordResetToken();

    // save token / deactivate validators in Schema
    await user.save({ validateBeforeSave: false });

    // send token to user email
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email.`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid for 10 min)',
        message,
      });
    } catch (error) {
      // clear fields
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;

      // save data
      await user.save({ validateBeforeSave: false });

      // generate error
      return next(
        new HttpException(
          `There was an error sending the email. Try again later!`,
          500
        )
      ); // INTERNAL SERVER ERROR
    }

    // send token to the client
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  }
);

// @desc    Reset password
// @route   POST /api/users/resetPassword
// @access  Public
export const resetPasswordController = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // get and hash the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    // get user based on token
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date(Date.now()) },
    });

    // if token has not expired, and there is user, set a new password
    if (!user) {
      // generate error
      return next(new HttpException(`token is invalid or has expired`, 400)); // BAD REQUEST
    }

    // update and
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    // save updated properties
    await user.save();

    // create a new token
    const token = await signToken(user._id);

    // send new token to the client
    res.status(201).json({
      status: 'success',
      token,
    }); // CREATED
  }
);

// MIDDLEWARES
//--------------------------------------------------------------------------------------------------
export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // get token from authorization header
    const authorization = <string>req.headers.authorization;

    // extract token from string
    const token =
      authorization && authorization.startsWith('Bearer')
        ? authorization.split(' ')[1]
        : null;

    // token does not exist?
    if (!token) {
      return next(
        new HttpException(
          'You are not logged in! Please log in to get access.',
          401
        )
      ); // UNAUTHORIZED
    }

    // extract fields from decoded token
    const { id, iat } = await verifyToken(token);

    // find current user by id
    const currentUser = (await User.findById(id)) as UserDocument;

    // current user does not exit?
    if (!currentUser) {
      return next(
        new HttpException(
          'The user belonging to this token does no longer exist.',
          401
        )
      ); // UNAUTHORIZED
    }

    // did user changed the password after the token was issued?
    if (currentUser.changedPasswordAfter(iat)) {
      return next(
        new HttpException(
          'User recently changed password! Please log in again.',
          401
        )
      ); // UNAUTHORIZED
    }

    // grant access to protected route
    req.body.user = currentUser;

    next();
  }
);

export const restrictTo = (...roles: string[]): ExpressMiddleware => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // does current user's role matches defined roles on resource?
    if (!roles.includes(req.body.user.role)) {
      return next(
        new HttpException(
          `You do not have permission to perform this action.`,
          403
        )
      ); // FORBIDDEN
    }

    // continue
    next();
  };
};
