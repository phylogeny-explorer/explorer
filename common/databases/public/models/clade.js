/*!
 * Phylogeny Explorer
 *
 * @summary Model representing a role
 * @author John Ropas
 * @since 29/09/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import mongoose from 'mongoose';
import asset from '../../shared_schema/asset';
import connection from '../connection';
import Levenshtein from 'fast-levenshtein';

const CladeSchema = new mongoose.Schema({
  parent: { type: mongoose.Schema.ObjectId, ref: 'Clade', index: true },
  name: { type: String },
  description: { type: String },
  otherNames: { type: String },
  extant: { type: Boolean },
  assets: [asset],
  created: { type: Date, default: Date.now() },
  modified: { type: Date },
  attributions: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Attribution' } ],
});

// use function() {} as arrow functions have poor reference to this
// eslint-disable-next-line func-names
CladeSchema.static('searchByNameWithSynonyms', function (query, self, cb) {
  if (query.replace(/[^a-zA-Z0-9]/g, '').length === 0) cb(null, []); // ignore special-character-only searches

  this.find()
    .where({
      $or: [
        { 'name': new RegExp(`^${query}| +${query}`, 'i') },
        { 'otherNames': new RegExp(`^${query}| ${query}|-${query}`, 'i') }
      ]
    })
    .where('_id')
    .ne(self)
    .select('name otherNames')
    .exec()
    .then(results => {
      return results
        .map(result => scoreResult(query, result))
        .sort((clade1, clade2) => (clade1.score - clade2.score));
    })
    .then(results => cb(null, results))
    .catch(cb);
});

// search index, for self(_id), name, otherNames searches
CladeSchema.index({ _id: 1, name: 1, otherNames: 1 });

export default connection.model('Clade', CladeSchema);


function scoreResult(query, result)
{
  let nameDistance = Levenshtein.get(query, result.name, {useCollator: true});
  let otherNamesDistance = result.otherNames ? reduceOtherNamesToSmallestDistance(query, result.otherNames) : 9999;
  result.score = Math.min(nameDistance, otherNamesDistance);
  return result;
}

function reduceOtherNamesToSmallestDistance(query, otherNames)
{
  return otherNames
    .split(',')
    .map(name => name.trim())
    .reduce((previous, current) => Math.min(previous, Levenshtein.get(query, current, {useCollator: true})), 9999);
}