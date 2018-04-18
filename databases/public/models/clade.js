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

export default function(connection) {
  const CladeSchema = new mongoose.Schema({
    parent: { type: mongoose.Schema.ObjectId, ref: 'Clade' },
    name: { type: String },
    description: { type: String },
    otherNames: { type: String },
    extant: { type: Boolean },
    assets: [asset],
    created: { type: Date, default: Date.now() },
    modified: { type: Date },
  });

  return connection.model('Clade', CladeSchema);
}