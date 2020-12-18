/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
// import { ApiFeatures, catchAsync } from '@codebase/postgresapi/utils';
// import { HttpException } from '@codebase/shared/exceptions';
import { CourseModel } from '@codebase/postgresapi/models';

export const getCourses = (req: Request, res: Response, next: NextFunction) => {
  // const output = CourseModel.findAll().then((results) =>
  //   console.log(JSON.stringify(results))
  // );
};

// const CourseModel = initCourseModel(sequelize);

// CourseModel.findAll().then((results) =>
//   console.log(JSON.stringify(results))
// );
