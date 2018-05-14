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

