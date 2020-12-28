/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response, NextFunction } from 'express';
import { Tour } from '@codebase/natoursapi/models';
import { ApiFeatures, catchAsync } from '@codebase/natoursapi/utils';
import { HttpException } from '@codebase/shared/exceptions';

// MIDDLEWARE ALIAS ROUTE
export const aliasTopTours = (req: Request, res: Response, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

export const createTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const tour = await Tour.create(req.body);
    res.status(201).json({ status: 'success', data: { tour } });
  }
);

export const getAllTours = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // EXTEND QUERY
    const features = new ApiFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // EXECUTE QUERY
    const tours = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    });
  }
);

export const getTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const tour = await Tour.findById(id);

    if (!tour) {
      return next(new HttpException('No tour found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  }
);

export const updateTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      // FIXED: Mongoose supports validation for update(), updateOne(), updateMany(), and findOneAndUpdate() operations.
      runValidators: true,
    });

    if (!tour) {
      return next(new HttpException('No tour found', 404));
    }

    res.status(200).json({ status: 'success', data: { tour } });
  }
);

export const deleteTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) {
      return next(new HttpException('No tour found', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
);

export const getTourStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          // _id: '$ratingsAverage',
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
      // {
      //   $match: { _id: { $ne: 'EASY' } },
      // },
    ]);

    res.status(200).json({
      status: 'success',
      data: { stats },
    });
  }
);

export const getMonthlyPlan = catchAsync(
  async (req: Request, res: Response) => {
    const year: number = +req.params.year;
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: { _id: 0 },
      },
      {
        $sort: { numTourStarts: -1 },
      },
      {
        $limit: 12,
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: { plan },
    });
  }
);
