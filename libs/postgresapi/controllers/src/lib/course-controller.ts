/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { findAllCourses } from '@codebase/postgresapi/queries';

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

  findAllCourses().then((courses) => {
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: courses.length,
      data: { courses },
    });
  });
};