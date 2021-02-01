import { Request, Response } from 'express';
import { partial } from 'ramda';

import { onError, onSuccess } from '@codebase/postgresapi/utils';
import {
  findAllCourses,
  findCourseDetail,
} from '@codebase/postgresapi/queries';

export const getAllCoursesController = (req: Request, res: Response): void => {
  findAllCourses()
    .then(partial(onSuccess, [res]))
    .catch(partial(onError, [res, 'Find all courses failed.']));
};

export const getCourseDetailController = (
  req: Request,
  res: Response
): void => {
  const { id } = req.params;
  const courseId: number = parseInt(id);

  findCourseDetail(courseId)
    .then(partial(onSuccess, [res]))
    .catch(
      partial(onError, [
        res,
        `Could not find course detail for id: ${courseId}.`,
      ])
    );
};
