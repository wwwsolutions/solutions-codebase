/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response, NextFunction } from 'express';
import { Course } from '@codebase/postgresapi/models';
// import { ApiFeatures, catchAsync } from '@codebase/postgresapi/utils';
// import { HttpException } from '@codebase/shared/exceptions';

export const getCourses = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //
  }
);
