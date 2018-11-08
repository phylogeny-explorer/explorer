/**
 * Module dependencies.
 */

import { Router } from '../modules';
import AuthenticationController from '../controllers/authentication';

/**
 * Router to serve routes for security
 */
const controller = AuthenticationController;
const router = new Router(controller);
router
  .post('/auth/login', controller.login)
  .post('/auth/forgot', controller.forgot)
  .post('/auth/password-reset', controller.passwordReset)
  .post('/auth/signup', controller.signup)
  .post('/auth/logout', controller.logout);

export default router;

