import crypto from 'crypto';
import { NextFunction } from 'express';
import mongoose, { Document, Schema } from 'mongoose';
import validator from 'validator';
import * as bcrypt from 'bcryptjs';

// INTERFACES
//--------------------------------------------------------------------------------------------------

// Equivalent to calling `pre()` on `find`, `findOne`, `findOneAndUpdate`.

// TODO: duplicate, extract to shared lib
interface DocumentFindMethods {
  find(args: unknown);
  findOne(args: unknown);
  findOneAndUpdate(args: unknown);
}
interface HasCorrectPassword {
  hasCorrectPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
}

interface ChangedPasswordAfter {
  changedPasswordAfter(iat: Date);
}

interface CreatePasswordResetToken {
  createPasswordResetToken(): string;
}

export interface UserDocument
  extends Document,
    HasCorrectPassword,
    ChangedPasswordAfter,
    CreatePasswordResetToken,
    DocumentFindMethods {
  email: string;
  photo?: string;
  password: string;
  passwordConfirm?: string;
  role: string;
  passwordChangedAt: Date;
  passwordResetToken: string;
  passwordResetExpires: Date;
  active: boolean;
}

// SCHEMA
//--------------------------------------------------------------------------------------------------
export const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'A user must have a name.'],
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    photo: {
      type: String,
      index: true,
    },
    role: {
      type: String,
      enum: ['user', 'guide', 'lead-guide', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false, // { select : false } means the field will not be queried from the database at all.
    },
    passwordConfirm: <unknown>{
      type: String,
      required: [true, `Please confirm your password.`],
      validate: {
        validator: function (el) {
          // Only works on CREATE and SAVE
          // When updating user, implement >>> User.save() method!!!
          return el === this.password;
        },
        message: 'Passwords are not the same!',
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  // SCHEMA OPTIONS
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// HOOKS
//--------------------------------------------------------------------------------------------------

// hash password
userSchema.pre<UserDocument>(
  'save',
  async function name(next: NextFunction): Promise<void> {
    // was password modified?
    if (!this.isModified('password')) return next();

    // hash password
    this.password = await bcrypt.hash(this.password, 12);

    // remove redundant field
    this.passwordConfirm = undefined;

    next();
  }
);

// update changedPasswordAt property for the user
userSchema.pre<UserDocument>(
  'save',
  async function name(next: NextFunction): Promise<void> {
    // password not modified?
    if (!this.isModified('password') || this.isNew) return next();

    // generate new timestamp
    this.passwordChangedAt = new Date(Date.now() - 1000); // subtract 1 second *(hack)

    next();
  }
);

// Equivalent to calling `pre()` on `find`, `findOne`, `findOneAndUpdate`.
userSchema.pre<UserDocument>(
  /^find/,
  async function name(next: NextFunction): Promise<void> {
    this.find({ active: { $ne: false } }); // 'this' points to the current query
    next();
  }
);

// INSTANCE METHODS
//--------------------------------------------------------------------------------------------------
userSchema.methods.hasCorrectPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// FIXME: Property 'passwordChangedAt' does not exist on type 'Document<any>'.ts(2339)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
userSchema.methods.changedPasswordAfter = function <UserDocument>(
  JwtTimestamp: string
): boolean {
  if (this.passwordChangedAt) {
    const changedTimestamp = +this.passwordChangedAt.getTime() / 1000;
    return +JwtTimestamp < changedTimestamp;
  }

  // user has never changed the password
  return false;
};

// FIXME: Property 'passwordChangedAt' does not exist on type 'Document<any>'.ts(2339)
userSchema.methods.createPasswordResetToken = function <
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  UserDocument
>(): string {
  // generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // store encrypted version of the token into db
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  // store token expiration time into db
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  // return plain text token
  return resetToken;
};

// MODEL
//--------------------------------------------------------------------------------------------------
export const User = mongoose.model<UserDocument>('User', userSchema);
