/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 01/12/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import async from 'async';
import Clade from '../models/clade';
import AwsS3FileManager from '../middleware/AwsS3FileManager';

class CladeTransactionProcessor {
  constructor(transaction, index, cb) {
    this._transaction = transaction;
    this._index = index;
    this._callback = cb;
  }

  createClade() {
    const nc = new Clade();
    nc.parent = this._transaction.data.after.parent;
    nc.name = this._transaction.data.after.name;
    nc.description = this._transaction.data.after.description;
    nc.otherNames = this._transaction.data.after.otherNames;
    nc.extant = this._transaction.data.after.extant;
    nc.save((error, clade) => {
      this._registerAssets(clade, (err) => {
        const status = err ? 'FAILED' : 'DONE';
        this._updateCurrentTransaction(err, status, clade._id);
      });
    });
  }

  updateClade() {
    Clade.findById(this._transaction.identifier, (err, oldClade) => {
      const nc = oldClade;
      nc.parent = this._transaction.data.after.parent;
      nc.name = this._transaction.data.after.name;
      nc.description = this._transaction.data.after.description;
      nc.otherNames = this._transaction.data.after.otherNames;
      nc.extant = this._transaction.data.after.extant;
      nc.modified = Date.now();
      nc.save((err1, clade) => {
        this._registerAssets(clade, (err2) => {
          const finalError = err || err1 || err2 || null;
          const status = finalError ? 'FAILED' : 'DONE';
          this._updateCurrentTransaction(finalError, status);
        });
      });
    });
  }

  destroyClade() {
    Clade.findOne(this._transaction.identifier, (err, clade) => {
      this._deleteAssets(clade, (err1) => {
        console.log(this._transaction._id, this._transaction.identifier, err1);
        if (clade) {
          clade.remove((err2, deleted) => {
            const finalError = err || err1 || err2 || null;
            const status = finalError ? 'FAILED' : 'DONE';
            this._updateCurrentTransaction(finalError, status);
          });
        } else {
          this._updateCurrentTransaction(err1, 'FAILED');
        }
      });
    });
  }

  _deleteAssets(clade, cb) {
    const assets = this._transaction.assets.before;
    const fileManager = new AwsS3FileManager();
    async.forEachOf(assets, (asset, index, callback) => {
      fileManager.destroyCladeImage(clade._id, asset.name, callback);
    }, (err) => {
      cb(err);
    });
  }

  _registerAssets(clade, cb) {
    const assets = this._transaction.assets.after;
    const fileManager = new AwsS3FileManager();
    async.forEachOf(assets, (asset, index, callback) => {
      if (asset.folder === 'temp') {
        fileManager.moveTempImageToCladeFolder(asset.name, clade._id, callback);
      } else {
        callback();
      }
    }, (err) => {
      if (err) {
        cb(err);
      } else {
        const cl = clade;
        cl.assets = assets;
        cl.save(err1 => cb(err1)); // save & return to update the status
      }
    });
  }

  _updateCurrentTransaction(err, newStatus, identifier) {
    this._transaction.status = newStatus; // status required
    this._transaction.identifier = identifier || this._transaction.identifier;
    this._transaction.save(err1 => {
      console.log('transaction saved!');
      this._callback(err || err1 || null)
    });
  }
}

export default CladeTransactionProcessor;
