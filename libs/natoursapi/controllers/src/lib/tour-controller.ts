import { Request, Response } from 'express';
// import { toursSimple as tours } from '@codebase/natoursapi/fake-data';

import { Tour } from '@codebase/natoursapi/models';
import { async } from 'rxjs';

export const createTour = async (req: Request, res: Response) => {
  try {
    // const newTour = new Tour({})
    // newTour.save()
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent.',
    });
  }
};

export const getTours = async (req: Request, res: Response) => {
  try {
    const tours = await Tour.find();
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

export const getTour = (req: Request, res: Response) => {
  const { id } = req.params;
  // const tour = tours.find((el) => el.id === parseInt(id));
  // res.status(200).json({
  //   status: 'success',
  //   data: { tour },
  // });
};

export const deleteTour = (req: Request, res: Response) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

export const updateTour = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated tour here',
    },
  });
};

// export const checkId = (req: Request, res: Response, next, val) => {
//   // if (val > tours.length) {
//   //   return res.status(404).json({
//   //     status: 'fail',
//   //     message: 'Invalid ID',
//   //   });
//   // }
//   next();
// };

// export const checkBody = (req: Request, res: Response, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price.',
//     });
//   }
//   next();
// };
