/*!
 * Phylogeny Explorer
 *
 * @summary 
 * @author John Ropas
 * @since 16/11/2016
 * 
 * Copyright(c) 2016 Phylogeny Explorer
 */

/**
 * Module dependencies.
 */

import Modules from '../modules';
import TransactionsController from '../controllers/transaction';

/**
 * Router to server routes for user
 */

const controller = new TransactionsController();
const router = new Modules.Router(controller);

router
  .get('/transactions', controller.getCladeTransactions)
  .get('/transactions/:transactionId', controller.getCladeTransaction)
  .post('/transactions', controller.createCladeTransaction)
  // .put('/transactions/:transactionId', controller.updateCladeTransaction)
  .delete('/transactions/:transactionId', controller.destroyCladeTransaction);

export default router;
