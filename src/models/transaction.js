/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 16/11/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import mongoose from 'mongoose';
import './user';

const asset = new mongoose.Schema({
  name: { type: String },
  isDefault: { type: Boolean },
  folder: { type: String },
}, { _id: false });

/**
 * Transaction schema definition
 */
const TransactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  cycle: { type: mongoose.Schema.ObjectId },
  identifier: { type: mongoose.Schema.ObjectId },
  data: {
    before: { type: Object, default: {} },
    after: { type: Object, default: {} },
  },
  assets: {
    before: [asset],
    after: [asset],
  },
  mode: {
    type: String,
    enum: ['CREATE', 'UPDATE', 'DESTROY'],
  },
  type: {
    type: String,
    enum: ['CLADE', 'USER', 'ROLE', 'SETTINGS'],
  },
  status: {
    type: String,
    enum: ['REVIEW', 'PENDING', 'DONE', 'FAILED'],
    default: 'DONE',
  },
  created: { type: Date, default: Date.now },
  modified: { type: Date },
}, { minimize: false });

export default mongoose.model('Transaction', TransactionSchema);
