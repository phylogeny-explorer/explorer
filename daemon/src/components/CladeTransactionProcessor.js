import { Clade } from 'common/databases/public';
import { S3 } from 'common/aws';

export default class CladeTransactionProcessor {
  constructor(transaction) {
    this._transaction = transaction;
    this._completeTransaction = this._completeTransaction.bind(this);
    this._failTransaction = this._failTransaction.bind(this);
    this._registerAssets = this._registerAssets.bind(this);
    this._deleteAssets = this._deleteAssets.bind(this);
    this._saveDataToClade = this._saveDataToClade.bind(this);
  }

  createClade() {
    return this._saveDataToClade(new Clade())
      .then(this._registerAssets)
      .then(this._completeTransaction)
      .catch(this._failTransaction)
    ;
  }

  updateClade() {
    return Clade.findById(this._transaction.identifier)
      .then(this._saveDataToClade)
      .then(this._registerAssets)
      .then(this._completeTransaction)
      .catch(this._failTransaction)
    ;
  }

  destroyClade() {
    return Clade.findByIdAndRemove(this._transaction.identifier)
      .then(this._deleteAssets)
      .then(this._completeTransaction)
      .catch(this._failTransaction)
    ;
  }

  _saveDataToClade(clade) {
    if (!clade) throw new Error('Clade with id ' + this._transaction.identifier + ' not found.');
    clade.parent = this._transaction.data.after.parent;
    clade.name = this._transaction.data.after.name;
    clade.description = this._transaction.data.after.description;
    clade.otherNames = this._transaction.data.after.otherNames;
    clade.extant = !!this._transaction.data.after.extant;
    clade.assets = this._transaction.assets.after;
    clade.modified = Date.now();
    return clade.save();
  }

  _deleteAssets(clade) {
    return Promise.all(this._transaction.assets.before.map(asset => {
      return S3.destroyCladeImage(clade._id, asset.name);
    }));
  }

  _registerAssets(clade) {
    return Promise.all(this._transaction.assets.after.map(asset => {
      if (asset.folder === 'temp') return S3.moveTempImageToCladeFolder(asset.name, clade._id);
      return null;
    }));
  }

  _completeTransaction(clade) {
    this._transaction.status = 'DONE';
    this._transaction.identifier = clade ? clade._id : this._transaction.identifier;
    return this._transaction.save();
  }

  _failTransaction(err) {
    this._transaction.status = 'FAILED';
    this._transaction.error = err;
    return this._transaction.save().then(() => {
      throw new Error(err);
    });
  }
}