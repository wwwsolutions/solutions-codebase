/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction } from 'express';
import { Document, Schema } from 'mongoose';
import validator from 'validator';

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
      unique: true,
      lowercase: true,
      required: [true, "Can't be blank."],
      // validate: [validator.isEmail],
      // index: true,
    } as unknown,
    photo: {
      type: String,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Can't be blank."],
      index: true,
      minlength: 8,
    },
    passwordConfirm: {
      type: String,
      required: [true, `Please confirm your password.`],
    },
  },
  // SCHEMA OPTIONS
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

interface UserDocument extends Document {
  name: string;
  email: string;
  photo: string;
  password: string;
  passwordConfirm: string;
}
