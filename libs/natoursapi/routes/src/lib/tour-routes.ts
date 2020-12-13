import { Router } from 'express';
import {
  getTours,
  getTour,
  createTour,
  deleteTour,
  updateTour,
  aliasTopTours,
  // AGGREGATIONS
  getTourStats,
  getMonthlyPlan,
} from '@codebase/natoursapi/controllers';

const router = Router();

router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/top-5-cheap').get(aliasTopTours, getTours);
router.route('/').get(getTours).post(createTour);
router.route('/:id').get(getTour).delete(deleteTour).patch(updateTour);

export { router as tourRouter };
