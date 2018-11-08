/**
 * Module dependencies.
 */

import { Router } from '../modules';
import RuleController from '../controllers/rule';

/**
 * Router to server routes for user
 */
const controller = new RuleController();
const router = new Router(controller);

router
  .get('/rules', controller.getRules)
  .get('/rules/generate', controller.generate);

export default router;

