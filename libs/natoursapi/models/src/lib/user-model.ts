import { NextFunction } from 'express';
import mongoose, { Document, Schema } from 'mongoose';
import validator from 'validator';
import * as bcrypt from 'bcryptjs';

// INTERFACES
//--------------------------------------------------------------------------------------------------
interface CorrectPassword {
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
}

export interface UserDocument extends Document, CorrectPassword {
  correctPassword(password: string, userPassword: string): Promise<boolean>;
  changedPasswordAfter(iat: Date);
  name: string;
  email: string;
  photo?: string;
  role: string;
  password: string;
  passwordConfirm?: string;
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
      select: false,
    },
    passwordConfirm: <unknown>{
      type: String,
      required: [true, `Please confirm your password.`],
      validate: {
        validator: function (el) {
          // it only works on 'create()'  and 'save()'
          return el === this.password;
        },
        message: 'Passwords are not the same!',
      },
    },
    passwordChangedAt: Date,
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
userSchema.pre<UserDocument>(
  'save',
  async function name(next: NextFunction): Promise<void> {
    // IF PASSWORD HAS NOT BEEN MODIFIED --> EXIT
    if (!this.isModified('password')) return next();

    // GENERATE HASH
    this.password = await bcrypt.hash(this.password, 12);

    // DELETE NOW UNNECESSARY FIELD
    this.passwordConfirm = undefined;

    next();
  }
);

// METHODS
//--------------------------------------------------------------------------------------------------
userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (
  JwtTimestamp: string
): boolean {
  if (this.passwordChangedAt) {
    const changedTimestamp = +this.passwordChangedAt.getTime() / 1000;
    return +JwtTimestamp < changedTimestamp;
  }

  // FALSE MEANS NOT CHANGED
  return false;
};

// MODEL
export const User = mongoose.model('User', userSchema);
