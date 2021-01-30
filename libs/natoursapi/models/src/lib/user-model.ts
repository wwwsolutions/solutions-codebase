import { NextFunction } from 'express';
import mongoose, { Document, Schema } from 'mongoose';
import validator from 'validator';
import * as bcrypt from 'bcryptjs';

// INTERFACES
//--------------------------------------------------------------------------------------------------
interface hasCorrectPassword {
  hasCorrectPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
}

export interface UserDocument extends Document, hasCorrectPassword {
  hasCorrectPassword(password: string, userPassword: string): Promise<boolean>;
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
    passwordChangedAt: {
      type: Date,
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
userSchema.pre<UserDocument>('save', async function name(
  next: NextFunction
): Promise<void> {
  if (!this.isModified('password')) return next(); // EXIT IF PASSWORD HAS NOT BEEN MODIFIED
  this.password = await bcrypt.hash(this.password, 12); // HASH PASSWORD
  this.passwordConfirm = undefined; // REMOVE REDUNDANT FIELD
  next();
});

// METHODS
//--------------------------------------------------------------------------------------------------
userSchema.methods.hasCorrectPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (
  JwtTimestamp: string
): boolean {
  console.log('changedTimestamp: ', JwtTimestamp);
  // FIXME: this.passwordChangedAt:  undefined
  console.log('this.passwordChangedAt: ', this.passwordChangedAt);

  if (this.passwordChangedAt) {
    const changedTimestamp = +this.passwordChangedAt.getTime() / 1000;
    return +JwtTimestamp < changedTimestamp;
  }

  // user has never changed the password
  return false;
};

// MODEL
export const User = mongoose.model('User', userSchema);
