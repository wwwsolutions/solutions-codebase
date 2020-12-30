import { Router } from 'express';

import {
  login,
  signup,
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} from '@codebase/natoursapi/controllers';

const router: Router = Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);

export { router as userRouter };
