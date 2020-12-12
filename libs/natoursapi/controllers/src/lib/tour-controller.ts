import { Request, Response } from 'express';
import { Tour } from '@codebase/natoursapi/models';

export const createTour = async (req: Request, res: Response) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

export const getTours = async (req: Request, res: Response): Promise<void> => {
  console.log(req.query);
  try {
    // PREPARE QUERYSTRING

    // BUILD QUERY

    // FILTERING

    // TODO: candidate for ramda implementation
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // ADVANCED FILTERING
    // TODO: candidate for ramda implementation
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Tour.find(JSON.parse(queryStr));

    // SORTING
    if (req.query.sort) {
      // TODO: candidate for ramda implementation
      const sortBy = req.query.sort.toString().split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // FIELD LIMITING
    if (req.query.fields) {
      // TODO: candidate for ramda implementation
      const fields = req.query.fields.toString().split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // PAGINATION
    // TODO: candidate for ramda implementation
    const page = parseInt(req.query.page.toString()) || 1;
    const limit = parseInt(req.query.limit.toString()) || 100;
    const skip = (page - 1) * limit;
    // skip = (1 - 1) * 10 = 0 * 10 = 0
    // skip = (2 - 1) * 10 = 1 * 10 = 10
    // skip = (3 - 1) * 10 = 2 * 10 = 20

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exist.');
    }

    // EXECUTE QUERY
    const tours = await query;

    // const query = Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

export const getTour = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findById(id);
    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

export const updateTour = async (req: Request, res: Response) => {
  try {
    // FIXED: to test in POSTMAN >>> add header to 'Content-Type: application/json'
    console.log('req.body:', req.body);

    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      // FIXED: Mongoose supports validation for update(), updateOne(), updateMany(), and findOneAndUpdate() operations.
      // runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

export const deleteTour = async (req: Request, res: Response) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};
