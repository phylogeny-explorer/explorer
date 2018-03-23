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

/**
 * Role schema definition
 */

const permissionRules = new mongoose.Schema({
  path: { type: String },
  controller: { type: String },
  action: { type: String },
  method: { type: String },
  allow: { type: Boolean },
}, { _id: false });

export const RoleSchema = new mongoose.Schema({
  description: { type: String, unique: true },
  isDefault: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  rules: [permissionRules],
  created: { type: Date, default: Date.now },
  modified: { type: Date },
});


export default mongoose.model('Role', RoleSchema);
