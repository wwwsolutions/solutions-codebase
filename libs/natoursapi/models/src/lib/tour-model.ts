/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction } from 'express';
import mongoose, { Document, Schema, Query, Aggregate } from 'mongoose';
import slugify from 'slugify';
// import validator from 'validator';

// INTERFACES
//--------------------------------------------------------------------------------------------------

interface StartLocation {
  type: unknown;
  coordinates: number[]; // geo spatial data
  address: string;
  description: string;
}

interface Location extends StartLocation {
  day: number;
}

interface DocumentLocationData {
  startLocation: StartLocation;
  locations: Location[];
}

// TODO: duplicate, extract to shared lib
interface DocumentFindMethods {
  find(args: unknown);
  findOne(args: unknown);
  findOneAndUpdate(args: unknown);
}

// TODO: duplicate, extract to shared lib
interface DocumentAggregateMethods {
  _pipeline(arg0: string, _pipeline: unknown);
  getQuery();
}

// https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
export interface TourDocument
  extends Document,
    DocumentFindMethods,
    DocumentAggregateMethods,
    DocumentLocationData {
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

// SCHEMA
//--------------------------------------------------------------------------------------------------

export const tourSchema: Schema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'A tour must have a name.'],
      maxlength: [
        40,
        'A tour name must have less or equal then 40 characters.',
      ],
      minlength: [
        10,
        'A tour name must have more or equal then 10 characters.',
      ],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration.'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size.'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty.'],
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
          return val < this.price; // CAVEAT: 'this' only points to current doc on NEW document creation
        },
        message: 'Discount price ({VALUE}) should not be below regular price.',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary.'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image.'],
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
    // GEO SPATIAL DATA
    startLocation: {
      // GeoJSON format
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
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
tourSchema.pre<TourDocument>('save', function (next: NextFunction): void {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.pre<TourDocument>(/^find/, function name(next: NextFunction): void {
  this.find({ secretTour: { $ne: true } });
  next();
});

tourSchema.post<TourDocument>(/^find/, function name(
  docs: TourDocument[],
  next: NextFunction
): void {
  // console.log(docs);
  next();
});

tourSchema.pre<TourDocument>(/^aggregate/, function (next: NextFunction): void {
  console.log('this:', this._pipeline);
  this.getQuery();
  next();
});

// VIRTUAL PROPERTIES
//--------------------------------------------------------------------------------------------------
tourSchema.virtual('durationWeeks').get(function (this: TourDocument) {
  return this.duration / 7;
});

// INSTANCE METHODS
//--------------------------------------------------------------------------------------------------

// METHOD 1

// METHOD 2

// MODEL
//--------------------------------------------------------------------------------------------------
export const Tour = mongoose.model('Tour', tourSchema);
