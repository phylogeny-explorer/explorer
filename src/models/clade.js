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
import publicDb from '../databases/publicConnection';
import asset from './asset';

/**
 * Clade schema definition
 */
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

export default publicDb.model('Clade', CladeSchema);