import { Router, Request, Response } from 'express';
import {
  getTours,
  getTour,
  createTour,
  deleteTour,
  updateTour,
  checkId,
} from '@codebase/natoursapi/controllers';

export const tourRouter = Router();

// VALIDATE ID
tourRouter.param('id', checkId);

tourRouter.route('/').get(getTours).post(createTour);
tourRouter.route('/:id').get(getTour).delete(deleteTour).patch(updateTour);
