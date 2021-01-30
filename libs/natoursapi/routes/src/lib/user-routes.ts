import { Router } from 'express';

import {
  loginController,
  signupController,
  getAllUsersController,
  getUserController,
  createUserController,
  deleteUserController,
  updateUserController,
  forgotPasswordController,
  resetPasswordController,
} from '@codebase/natoursapi/controllers';

const router: Router = Router();

router.route('/forgotPassword').post(forgotPasswordController);
router.route('/resetPassword').post(resetPasswordController);

router.route('/signup').post(signupController);
router.route('/login').post(loginController);

router.route('/').get(getAllUsersController).post(createUserController);
router
  .route('/:id')
  .get(getUserController)
  .delete(deleteUserController)
  .patch(updateUserController);

export { router as userRouter };
