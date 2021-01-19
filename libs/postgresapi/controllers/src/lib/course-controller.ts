import { Request, Response } from 'express';
import { partial } from 'ramda';
import {
  findAllCourses,
  findCourseDetail,
} from '@codebase/postgresapi/queries';
import { onError, onSuccess } from '@codebase/postgresapi/utils';

export const getCoursesController = (req: Request, res: Response): void => {
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
  res: Response
): void => {
  const { id } = req.params;
  const courseId = parseInt(id);

  findCourseDetail(courseId)
    .then(partial(onSuccess, [res]))
    .catch(partial(onError, [res, 'Find all courses failed.']));
};
