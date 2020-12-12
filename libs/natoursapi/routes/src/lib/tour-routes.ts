import { Router } from 'express';
import {
  getTours,
  getTour,
  createTour,
  deleteTour,
  updateTour,
  aliasTopTours,
  getTourStats,
} from '@codebase/natoursapi/controllers';

export const tourRouter = Router();

// VALIDATE ID
// tourRouter.param('id', checkId);

tourRouter.route('/tour-stats').get(getTourStats);
tourRouter.route('/top-5-cheap').get(aliasTopTours, getTours);
tourRouter.route('/').get(getTours).post(createTour);
tourRouter.route('/:id').get(getTour).delete(deleteTour).patch(updateTour);
