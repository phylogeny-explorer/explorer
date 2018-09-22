/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 06/10/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

/**
 * Module dependencies.
 */

import { Router } from '../modules';
import SettingsController from '../controllers/setting';

/**
 * Router to serve routes for security
 */
const controller = new SettingsController();
const router = new Router(controller);

router
  .get('/settings', controller.getSettings)
  .patch('/settings', controller.saveSettings);

export default router;
