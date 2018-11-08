
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
