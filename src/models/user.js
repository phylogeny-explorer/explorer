/*!
 * Phylogeny Explorer
 *
 * @summary Model representing a user
 * @author John Ropas
 * @since 19/09/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import mongoose from 'mongoose';

/**
 * User schema definition
 */
const UserSchema = new mongoose.Schema({
  title: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  postcode: { type: String, required: true },
  phone: { type: String },
  email: { type: String, unique: true, required: true },
  dateOfBirth: { type: Date },
  gender: { type: String, required: true },
  coverLetter: { type: String },
  subscribed: { type: Boolean, default: true },
  isActive: { type: Boolean, default: false },
  isConfirmed: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
  modified: { type: Date },
});

export default mongoose.model('User', UserSchema);
