/*!
 * Phylogeny Explorer
 *
 * @summary Define security routes
 * @author John Ropas
 * @since 06/10/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

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
  .post('/auth/passwordReset', controller.passwordReset)
  .post('/auth/signup', controller.signup)
  .post('/auth/logout', controller.logout);

export default router;

