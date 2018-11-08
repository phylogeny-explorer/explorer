/**
 * Module dependencies.
 */

import { Router } from '../modules';
import RoleController from '../controllers/role';

/**
 * Router to server routes for user
 */
const controller = new RoleController();
const router = new Router(controller);

router
  .get('/roles', controller.getRoles)
  .get('/roles/active', controller.getActiveRoles)
  .get('/roles/:roleId', controller.getRole)
  .post('/roles', controller.createRole)
  .put('/roles/:roleId', controller.updateRole)
  .patch('/roles/:roleId', controller.setDefaultRole)
  .delete('/roles/:roleId', controller.destroyRole);

export default router;

