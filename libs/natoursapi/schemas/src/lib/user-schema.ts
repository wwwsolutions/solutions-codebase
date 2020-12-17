/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction } from 'express';
import { Document, Schema, Query, Aggregate } from 'mongoose';
import validator from 'validator';

interface UserDocument extends Document {
  name: string;
  email: string;
  photo: string;
  password: string;
  passwordConfirm: boolean;
}

export const userSchema = new Schema(
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
      required: [true, "can't be blank"],
      // validate: [validator.isEmail], FIXME:
      index: true,
    },
    password: {
      type: String,
      required: [true, "can't be blank"],
      index: true,
    },
    passwordConfirm: {
      type: Boolean,
    },
    photo: {
      type: String,
      index: true,
    },
  },
  // SCHEMA OPTIONS
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);
