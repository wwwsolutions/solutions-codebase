import { Request, Response } from 'express';
import { partial } from 'ramda';
import {
  createLesson,
  updateLesson,
  deleteLesson,
} from '@codebase/postgresapi/queries';
import {
  onError,
  onSuccess,
  databaseErrorHandler,
} from '@codebase/postgresapi/utils';

export const deleteLessonController = (req: Request, res: Response) => {
  const { id } = req.params;
  const lessonId = parseInt(id);

  deleteLesson(lessonId)
    .then(partial(onSuccess, [res]))
    .catch(partial(databaseErrorHandler, [res]))
    .catch(partial(onError, [res, 'Could not delete lesson.']));
};

export const updateLessonController = (req: Request, res: Response) => {
  const { id } = req.params;
  const lessonId = parseInt(id);

  updateLesson(lessonId, req.body)
    .then(partial(onSuccess, [res]))
    .catch(partial(databaseErrorHandler, [res]))
    .catch(partial(onError, [res, 'Could not update lesson.']));
};

export const createLessonController = (req: Request, res: Response) => {
  createLesson(req.body)
    .then(partial(onSuccess, [res]))
    .catch(partial(databaseErrorHandler, [res]))
    .catch(partial(onError, [res, 'Could not create lesson.']));
};
