import { Router, Request, Response } from 'express';
import { toursSimple as tours } from '@codebase/natoursapi/fake-data';

const getTours = (req: Request, res: Response) => {
  // console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    // requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

const getTour = (req: Request, res: Response) => {
  const { id } = req.params;
  const tour = tours.find((el) => el.id === parseInt(id));

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

const createTour = (req: Request, res: Response) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  res.status(201).json({
    status: 'success',
    data: { tour: newTour },
  });
};

const deleteTour = (req: Request, res: Response) => {
  const { id } = req.params;

  if (parseInt(id) > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const updateTour = (req: Request, res: Response) => {
  const { id } = req.params;

  if (parseInt(id) > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated tour here',
    },
  });
};

export const tourRouter = Router();
tourRouter.route('/').get(getTours).post(createTour);
tourRouter.route('/:id').get(getTour).delete(deleteTour).patch(updateTour);
