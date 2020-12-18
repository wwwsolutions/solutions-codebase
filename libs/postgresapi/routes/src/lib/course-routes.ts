import { Router } from 'express';
import {
  getCourses,
  // getCourse,
  // createCourse,
  // deleteCourse,
  // updateCourse
} from '@codebase/postgresapi/controllers';

const router = Router();

// router.route('/').get(getCourses).post(createCourse);
// router.route('/:id').get(getCourse).delete(deleteCourse).patch(updateCourse);

router.route('/').get(getCourses);

export { router as courseRouter };
