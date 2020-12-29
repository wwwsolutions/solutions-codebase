import { Router } from 'express';

import {
  signup,
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} from '@codebase/natoursapi/controllers';

const router: Router = Router();

router.route('/signup').post(signup);
router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);

export { router as userRouter };
