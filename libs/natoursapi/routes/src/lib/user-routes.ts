import { Router, Request, Response } from 'express';

import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} from '@codebase/natoursapi/controllers';

export const userRouter = Router();
userRouter.route('/').get(getUsers).post(createUser);
userRouter.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);
