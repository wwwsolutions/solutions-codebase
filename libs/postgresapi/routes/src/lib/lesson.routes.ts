import { Router } from 'express';
import {
  createLessonController,
  updateLessonController,
} from '@codebase/postgresapi/controllers';

const router: Router = Router();

// router.route('/').get(getCourses).post(createCourse);
// router.route('/:id').get(getCourse).delete(deleteCourse).patch(updateCourse);
router.route('/').post(createLessonController);
router.route('/:id').patch(updateLessonController);

export { router as lessonRouter };
