import { Router } from 'express';
import {
  getTours,
  getTour,
  createTour,
  deleteTour,
  updateTour,
  // checkId,
  // checkBody,
} from '@codebase/natoursapi/controllers';

export const tourRouter = Router();

// VALIDATE ID
// tourRouter.param('id', checkId);

// tourRouter.route('/').get(getTours).post(checkBody, createTour);
tourRouter.route('/').get(getTours).post(createTour);
tourRouter.route('/:id').get(getTour).delete(deleteTour).patch(updateTour);
