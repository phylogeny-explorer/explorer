/*!
 * Phylogeny Explorer
 *
 * @summary Define user routes
 * @author John Ropas
 * @since 19/09/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

/**
 * Module dependencies.
 */

import Modules from '../modules';
import UserController from '../controllers/user';

/**
 * Router to server routes for user
 */

const controller = new UserController();
const router = new Modules.Router(controller);

router
  .get('/users', controller.getUsers)
  .get('/users/:userId', controller.getUser)
  .post('/users', controller.createUser)
  .put('/users/:userId', controller.updateUser)
  .patch('/users/:userId/assign-role', controller.assignUserRole)
  .patch('/users/:userId/activate', controller.activateUser)
  .patch('/users/:userId/confirm', controller.confirmUser)
  .patch('/users/:userId/disapprove', controller.disapproveUser)
  .patch('/users/:userId/deactivate', controller.deactivateUser)
  .delete('/users/:userId', controller.destroyUser);

export default router;

