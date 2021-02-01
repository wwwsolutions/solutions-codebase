import { Router } from 'express';
import {
  getAllCoursesController,
  getCourseDetailController,
} from '@codebase/postgresapi/controllers';

const router: Router = Router();

// router.route('/').get(getCourses).post(createCourse);
// router.route('/:id').get(getCourse).delete(deleteCourse).patch(updateCourse);
router.route('/').get(getAllCoursesController);
router.route('/:id').get(getCourseDetailController);

export { router as courseRouter };
