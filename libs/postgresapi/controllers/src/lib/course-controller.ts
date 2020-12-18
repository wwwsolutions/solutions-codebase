/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { partial } from 'ramda';
import {
  findAllCourses,
  findCourseDetail,
} from '@codebase/postgresapi/queries';
import { onError, onSuccess } from '@codebase/postgresapi/utils';

// TODO: refactor: use async await useCatchAsync util fn

export const getCoursesController = ({
  req,
  res,
  next,
}: {
  req: Request;
  res: Response;
  next: NextFunction;
}): void => {
  findAllCourses()
    .then(partial(onSuccess, [res]))
    .catch(
      partial(onError, [
        res,
        'Could not find course detail for id: ${courseId}.',
      ])
    );
};

export const getCourseDetailController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const courseId = parseInt(id);

  findCourseDetail(courseId)
    .then(partial(onSuccess, [res]))
    .catch(partial(onError, [res, 'Find all courses failed.']));
};
