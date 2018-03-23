/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 24/10/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import mongoose from 'mongoose';

/**
 * Clade schema definition
 */

const OldCladeSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.ObjectId },
  bioClass: { type: String },
  citation: { type: String },
  created: { type: Number },
  defaultDepth: { type: Number },
  description: { type: String },
  extant: { type: Boolean },
  locked: { type: Boolean },
  modified: { type: Number },
  mother: { type: mongoose.Schema.ObjectId },
  name: { type: String },
  newpage: { type: String },
  otherNames: { type: String },
  references: { type: String },
  status: { type: Boolean },
});


export default mongoose.model('OldClade', OldCladeSchema);
