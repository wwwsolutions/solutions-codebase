/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
// import { ApiFeatures, catchAsync } from '@codebase/postgresapi/utils';
// import { HttpException } from '@codebase/shared/exceptions';
import { findAllCourses } from '@codebase/postgresapi/queries';

export const getCourses = (req: Request, res: Response, next: NextFunction) => {
  findAllCourses().then((courses) => {
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: courses.length,
      data: { courses },
    });
  });
};

// const CourseModel = initCourseModel(sequelize);

// CourseModel.findAll().then((results) =>
//   console.log(JSON.stringify(results))
// );
