import { Router } from 'express';
import {
  protect,
  getAllTours,
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
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/').get(protect, getAllTours).post(createTour);
router.route('/:id').get(getTour).delete(deleteTour).patch(updateTour);

export { router as tourRouter };
