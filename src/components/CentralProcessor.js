/*!
 * Phylogeny Explorer
 *
 * @summary 
 * @author John Ropas
 * @since 02/12/2016
 * 
 * Copyright(c) 2016 Phylogeny Explorer
 */

import CTP from './CladeTransactionProcessor';

class CentralProcessor {
  constructor(transaction, index, callback) {
    this._transaction = transaction;
    this._index = index;
    this._callback = callback;
    this._ctp = new CTP(this._transaction, this._index, this._callback);
  }

  process() {
    switch (this._transaction.mode) {
      case 'UPDATE': {
        this._processUpdateClade();
        break;
      }
      case 'CREATE': {
        this._processCreateClade();
        break;
      }
      case 'DESTROY': {
        this._processDestroyClade();
        break;
      }
      default: {
        console.error('Transaction is missing its mode!');
        break;
      }
    }
  }

  _processCreateClade() {
    this._ctp.createClade();
  }

  _processUpdateClade() {
    this._ctp.updateClade();
  }

  _processDestroyClade() {
    this._ctp.destroyClade();
  }
}

export default CentralProcessor;