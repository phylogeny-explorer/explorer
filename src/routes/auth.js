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

import Modules from '../modules';
import AuthenticationController from '../controllers/authentication';

/**
 * Router to serve routes for security
 */
const controller = AuthenticationController;
const router = new Modules.Router(controller);
router
  .post('/auth/login', controller.login)
  .post('/auth/signup', controller.signup)
  .post('/auth/logout', controller.logout);

export default router;

