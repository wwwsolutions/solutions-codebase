import { NextFunction, Request, Response } from 'express';

import { ExpressMiddleware } from '@codebase/shared/data-access-models';

export const catchAsync = (fn): ExpressMiddleware => {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };
};
