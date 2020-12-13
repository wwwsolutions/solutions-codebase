// SCHEMA WITH VALIDATORS
import { Document, Model, model, Types, Schema, Query } from 'mongoose';
import slugify from 'slugify';

export const tourSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'A tour must have a name.'],
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
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: { type: Number, required: [true, 'A tour must have a price.'] },
    priceDiscount: {
      type: Number,
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
}

// DOCUMENT MIDDLEWARE pre and post hooks
// https://stackoverflow.com/questions/58791115/typescript-property-slug-does-not-exist-on-type-document
// https://easyontheweb.com/pre-and-post-hooks-in-mongoose/

tourSchema.pre<TourDocument>('save', function name(next): void {
  this.slug = slugify(this.name, { lower: true });
  // const error = new Error('something went wrong');
  // console.log(error); // FIXME:
  // next();
});
// tourSchema.pre('save', () => console.log('Hello from pre save'));

// tourSchema.post<TourDocument>('save', function name(doc, next) {
//   console.log(doc);
//   const error = new Error('something went wrong');
//   next(error);
// });

// VIRTUAL PROPERTIES
tourSchema.virtual('durationWeeks').get(function (this: TourDocument) {
  return this.duration / 7;
});
