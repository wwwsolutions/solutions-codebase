import { Router } from 'express';
import {
  protect,
  restrictTo,
  getAllToursController,
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
router.route('/top-5-cheap').get(aliasTopTours, getAllToursController);
router.route('/').get(protect, getAllToursController).post(createTour);
router
  .route('/:id')
  .get(getTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour)
  .patch(updateTour);

export { router as tourRouter };
