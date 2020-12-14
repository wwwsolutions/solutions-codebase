/* eslint-disable @typescript-eslint/no-unused-vars */
// SCHEMA WITH VALIDATORS
import { NextFunction } from 'express';
import { Document, Schema, Query, Aggregate } from 'mongoose';
import slugify from 'slugify';
import validator from 'validator';

export const tourSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'A tour must have a name.'],
      maxlength: [40, 'A tour name must have less or equal then 40 characters'],
      minlength: [10, 'A tour name must have more or equal then 10 characters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: ['easy', 'medium', 'difficult'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: { type: Number, required: [true, 'A tour must have a price.'] },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // CAVEAT: 'this' only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should not be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false, // hide this field from the output
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  // SCHEMA OPTIONS
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// DOCUMENT MIDDLEWARE
// runs before .save() and .create()
// tourSchema.pre('save', function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

// https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
interface TourDocument extends Document {
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  price: number;
  priceDiscount?: number;
  summary: string;
  description?: string;
  imageCover: string;
  images?: [string];
  createdAt?: Date;
  startDates?: [Date];
  slug?: string;
  secretTour?: boolean;
}

// DOCUMENT MIDDLEWARE pre and post hooks
// https://stackoverflow.com/questions/58791115/typescript-property-slug-does-not-exist-on-type-document
// https://easyontheweb.com/pre-and-post-hooks-in-mongoose/
// https://thecodebarbarian.com/working-with-mongoose-in-typescript.html

// FIXME: next() throwing error
// FIXED: next() has be annotated with NextFunction imported form "express" package
// REFERENCE: https://stackoverflow.com/questions/58200432/argument-of-type-req-request-res-iresponse-next-nextfunction-void-is
tourSchema.pre<TourDocument>('save', function (next: NextFunction): void {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE pre and post hooks
// Target hook function, by using REGEX: all strings that start with 'find'
// FIXME: using regex as method name throws error
// REFERENCES: https://mongoosejs.com/docs/api.html#schema_Schema-pre
// tourSchema.pre(/^find/, function name(next: NextFunction): void {
//   this.find({ secretTour: { $ne: true } });
//   next();
// });

tourSchema.pre('find', function name(next: NextFunction): void {
  this.find({ secretTour: { $ne: true } });
  next();
});

tourSchema.post('find', function name(
  docs: TourDocument[],
  next: NextFunction
): void {
  console.log(docs);
  next();
});

// AGGREGATION MIDDLEWARE pre and post hooks
// FIXME: using regex as method name throws error
// tourSchema.pre('aggregate', function (next: NextFunction): void {
//   console.log('this:', this._pipeline);
//   this.getQuery();
//   next();
// });

// VIRTUAL PROPERTIES
tourSchema.virtual('durationWeeks').get(function (this: TourDocument) {
  return this.duration / 7;
});
