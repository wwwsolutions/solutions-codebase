import { Request, Response } from 'express';
import { partial } from 'ramda';

import {
  onError,
  onSuccess,
  databaseErrorHandler,
} from '@codebase/postgresapi/utils';
import {
  createLesson,
  updateLesson,
  deleteLesson,
} from '@codebase/postgresapi/queries';

export const createLessonController = (req: Request, res: Response): void => {
  createLesson(req.body)
    .then(partial(onSuccess, [res]))
    .catch(partial(databaseErrorHandler, [res]))
    .catch(partial(onError, [res, 'Could not create lesson.']));
};

export const updateLessonController = (req: Request, res: Response): void => {
  const { id } = req.params;
  const lessonId = parseInt(id);

  updateLesson(lessonId, req.body)
    .then(partial(onSuccess, [res]))
    .catch(partial(databaseErrorHandler, [res]))
    .catch(partial(onError, [res, 'Could not update lesson.']));
};

export const deleteLessonController = (req: Request, res: Response): void => {
  const { id } = req.params;
  const lessonId = parseInt(id);

  deleteLesson(lessonId)
    .then(partial(onSuccess, [res]))
    .catch(partial(databaseErrorHandler, [res]))
    .catch(partial(onError, [res, 'Could not delete lesson.']));
};
