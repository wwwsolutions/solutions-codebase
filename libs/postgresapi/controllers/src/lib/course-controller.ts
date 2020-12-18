/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { partial } from 'ramda';
import { findAllCourses } from '@codebase/postgresapi/queries';

import { onError } from '@codebase/postgresapi/utils';

// TODO: refactor: use async await useCatchAsync util fn

export const getCourses = ({
  req,
  res,
  next,
}: {
  req: Request;
  res: Response;
  next: NextFunction;
}): void => {
  // throw new Error('Error Ocurred!');

  findAllCourses()
    .then((courses) => {
      // SEND RESPONSE
      res.status(200).json({
        status: 'success',
        // results: courses.length,
        data: { courses },
      });
    })
    .catch(partial(onError, [res, 'Find all courses failed.']));
};
