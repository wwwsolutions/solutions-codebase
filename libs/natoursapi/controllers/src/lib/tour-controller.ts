/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response, NextFunction } from 'express';
import { Tour } from '@codebase/natoursapi/models';
import { ApiFeatures, catchAsync } from '@codebase/natoursapi/utils';
import { HttpException } from '@codebase/shared/exceptions';

// ALIASES
//--------------------------------------------------------------------------------------------
export const aliasTopTours = (req: Request, res: Response, next): void => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

// CONTROLLERS
//--------------------------------------------------------------------------------------------------

// @desc    Create tour
// @route   CREATE /api/tours
// @access  Protected/Admin
export const createTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // create tour
    const tour = await Tour.create(req.body);

    // send tour
    res.status(201).json({
      status: 'success',
      data: {
        tour,
      },
    }); // CREATED
  }
);

// @desc    Delete single tour by id
// @route   DELETE /api/tours/:id
// @access  Protected/Admin
export const deleteTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // find tour by id and delete
    const tour = await Tour.findByIdAndDelete(req.params.id);

    // does tour exist?
    if (!tour) {
      return next(new HttpException('Tour not found', 404)); // NOT FOUND
    }

    // send status
    res.status(204).json({ status: 'success', data: null }); // NO CONTENT
  }
);

// @desc    Get all tours
// @route   POST /api/tours
// @access  Public
export const getAllToursController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    // extend query
    const features = new ApiFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // execute query
    const tours = await features.query;

    // send tours
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    });
  }
);

// @desc    Get single tour by id
// @route   POST /api/tours/:id
// @access  Public
export const getTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    const tour = await Tour.findById(id);

    // no tour?
    if (!tour) {
      return next(new HttpException('No tour found with that ID', 404)); // NOT FOUND
    }

    // send tour
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

    res.status(200).json({ status: 'success', data: { stats } });
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

    res.status(200).json({ status: 'success', data: { plan } });
  }
);
