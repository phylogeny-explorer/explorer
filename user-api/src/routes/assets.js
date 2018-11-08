
/**
 * Module dependencies.
 */

import multer from 'multer';
import { Router } from '../modules';
import AssetController from '../controllers/asset';

const upload = multer({ dest: './build/temp' });

/**
 * Router to server routes for user
 */
const controller = new AssetController();
const router = new Router(controller);

router
  .post('/assets/temp', upload.single('cladeImg'), controller.uploadTempImage)
  .delete('/assets/clades/', controller.destroyCladeImage)
  .delete('/assets/temp/', controller.destroyTempImage);

export default router;

