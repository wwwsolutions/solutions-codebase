/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { partial } from 'ramda';
import { createLesson } from '@codebase/postgresapi/queries';
import { onError, onSuccess } from '@codebase/postgresapi/utils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const hri = require('human-readable-ids').hri;

// TODO: refactor: use async await useCatchAsync util fn

export const createLessonController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  createLesson(req.body)
    .then(partial(onSuccess, [res]))
    .catch((err) => {
      const id = hri.random();

      console.log('Database error ocurred', id, err);
      res.status(500).json({
        code: 'ERR-002',
        message: `Creation of lesson failed with error code: ${id}`,
      });
    })
    .catch(partial(onError, [res, 'Could not create lesson.']));
};

// export const createTour = catchAsync(
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const newTour = await Tour.create(req.body);
//     // Status code 201 Created
//     res.status(201).json({
//       status: 'success',
//       data: { tour: newTour },
//     });
//   }
// );
