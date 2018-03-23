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
import CladeController from '../controllers/clade';

/**
 * Router to server routes for user
 */
const controller = new CladeController();
const router = new Modules.Router(controller);

router
  .get('/clades/generate', controller.generate)
  .get('/clades/tree', controller.getClades)
  .get('/clades/tree/:id/', controller.getClades)
  .get('/clades/tree/depth/:depth', controller.getClades)
  .get('/clades/tree/:id/depth/:depth', controller.getClades)
  .get('/clades/:id', controller.getCladeById)
  .post('/clades/enrich', controller.enrichClades)
  .post('/clades/search', controller.searchForClades);

export default router;

