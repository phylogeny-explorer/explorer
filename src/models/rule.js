/*!
 * Phylogeny Explorer
 *
 * @summary 
 * @author John Ropas
 * @since 23/10/2016
 * 
 * Copyright(c) 2016 Phylogeny Explorer
 */

import mongoose from 'mongoose';

/**
 * Rule schema definition
 */
const RuleSchema = new mongoose.Schema({
  path: { type: String },
  method: { type: String },
  controller: { type: String },
  action: { type: String },
  created: { type: Date, default: Date.now },
  modified: { type: Date },
});

export default mongoose.model('Rule', RuleSchema);
