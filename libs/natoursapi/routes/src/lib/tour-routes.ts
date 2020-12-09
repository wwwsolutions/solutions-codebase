import { Router } from 'express';
import {
  getTours,
  getTour,
  createTour,
  deleteTour,
  updateTour,
} from '@codebase/natoursapi/controllers';

export const tourRouter = Router();
tourRouter.route('/').get(getTours).post(createTour);
tourRouter.route('/:id').get(getTour).delete(deleteTour).patch(updateTour);
