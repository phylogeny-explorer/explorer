/*!
 * Phylogeny Explorer
 *
 * @summary Define role routes
 * @author John Ropas
 * @since 30/09/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

/**
 * Module dependencies.
 */

import Modules from '../modules';
import RoleController from '../controllers/role';

/**
 * Router to server routes for user
 */
const controller = new RoleController();
const router = new Modules.Router(controller);

router
  .get('/roles', controller.getRoles)
  .get('/roles/active', controller.getActiveRoles)
  .get('/roles/:roleId', controller.getRole)
  .post('/roles', controller.createRole)
  .put('/roles/:roleId', controller.updateRole)
  .patch('/roles/:roleId', controller.setDefaultRole)
  .delete('/roles/:roleId', controller.destroyRole);

export default router;

