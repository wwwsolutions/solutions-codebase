/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { partial } from 'ramda';
import { createLesson, updateLesson } from '@codebase/postgresapi/queries';
import {
  onError,
  onSuccess,
  databaseErrorHandler,
} from '@codebase/postgresapi/utils';

// TODO: refactor: use async await useCatchAsync util fn

export const updateLessonController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const lessonId = parseInt(id);

  updateLesson(lessonId, req.body)
    .then(partial(onSuccess, [res]))
    .catch(partial(onError, [res, 'Could not update lesson.']));
};

export const createLessonController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  createLesson(req.body)
    .then(partial(onSuccess, [res]))
    .catch(partial(databaseErrorHandler, [res]))
    .catch(partial(onError, [res, 'Could not create lesson.']));
};
