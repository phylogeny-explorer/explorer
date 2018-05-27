/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 16/11/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import { Controller } from '../modules';
import { Transaction } from 'common/databases/admin';
import AccessControl from '../middleware/AccessControl';

import Promise from 'bluebird';

class TransactionController extends Controller {

  constructor() {
    super(AccessControl);
  }

  getCladeTransactions(req, res, next) {
    if (req.user.role.description === 'admin') {
      Transaction.find({ type: 'CLADE' }, (err, trs) => this.handleResponse(res, next, err, trs))
        .sort({ created: -1 })
        .limit(100)
        .populate('user');
    } else {
      Transaction.find({ type: 'CLADE', user: req.user._id }, (err, trs) => this.handleResponse(res, next, err, trs))
        .sort({ created: -1 })
        .limit(100)
        .populate('user');
    }
  }

  getCladeTransaction(req, res, next) {
    const transactionId = req.params.transactionId;
    Transaction.findOne({ _id: transactionId, type: 'CLADE' }, (err, role) => this.handleResponse(res, next, err, role))
      .populate('user', 'username');
  }

  createCladeTransaction(req, res, next) {
    const userId = req.user._id;
    const transaction = new Transaction();
    const hasChildren = req.body.hasChildren;

    transaction.identifier = req.body.identifier;
    transaction.data = {
      before: req.body.data.before || {},
      after: req.body.data.after || {},
    };
    transaction.assets = {
      before: req.body.assets.before || [],
      after: req.body.assets.after || [],
    };
    transaction.mode = req.body.mode.toUpperCase();
    transaction.user = userId;
    transaction.type = 'CLADE';
    transaction.status = (transaction.mode === 'DESTROY' && hasChildren) ? 'REVIEW' : 'PENDING';
    transaction.created = Date.now();
    transaction.modified = null;

    // When the transaction is saved, start watching it for completion. When done, return a response.
    // This is a really hacky way to make sure new and updated clades appear on the cladogram when
    // the form redirects to it after submission.
    transaction.save()
      .then((trans) => (new Promise((resolve, reject) => this.checkTransaction(trans, resolve, reject))))
      .then((trans) => this.handleResponse(res, next, null, trans))
      .catch((err) => this.handleResponse(res, next, err))
    ;
  }

  checkTransaction(transaction, resolve, reject) {
    Transaction.findOne({ _id: transaction._id })
      .then((trans) => {
        if (trans.status === 'DONE') resolve(trans);
        else setTimeout(() => this.checkTransaction(transaction, resolve, reject), 1000);
      })
      .catch(reject);
  }

  // updateCladeTransaction(req, res, next) {
  //   const transactionId = req.params.transactionId;
  //   const before = req.body.before || {};
  //   const after = req.body.after || {};
  //   const deletion = req.body.deletion;
  //   // TODO change this according to session
  //   const userId = '582001e2076a0f0be4f01e63';
  //   Transaction.findOne({ _id: transactionId, type: 'CLADE', status: 'PENDING' }, (err, tr) => {
  //     if (err) {
  //       return next(err);
  //     }
  //     const updatedTr = tr;
  //     updatedTr.before = before;
  //     updatedTr.after = after;
  //     updatedTr.deletion = deletion;
  //     updatedTr.user = userId;
  //     updatedTr.type = 'CLADE';
  //     updatedTr.status = 'PENDING';
  //     updatedTr.modified = Date.now();
  //     updatedTr.save(err2 => this.handleResponse(res, next, err2, updatedTr));
  //     return undefined;
  //   });
  // }

  destroyCladeTransaction(req, res, next) {
    const transactionId = req.params.transactionId;
    Transaction.findOne({ _id: transactionId, type: 'CLADE', status: 'PENDING' }).remove((err, deleted) =>
      this.handleResponse(res, next, err, { deleted, transactionId })
    );
  }
}

export default TransactionController;
