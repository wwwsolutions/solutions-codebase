import { Router } from 'express';
import { createLessonController } from '@codebase/postgresapi/controllers';

const router = Router();

router.route('/').post(createLessonController);

export { router as lessonRouter };
