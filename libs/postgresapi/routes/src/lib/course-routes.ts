import { Router } from 'express';
import { getCourses, getCourseDetail } from '@codebase/postgresapi/controllers';

const router = Router();

// router.route('/').get(getCourses).post(createCourse);
// router.route('/:id').get(getCourse).delete(deleteCourse).patch(updateCourse);
router.route('/').get(getCourses);
router.route('/:id').get(getCourseDetail);

export { router as courseRouter };
