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
import bcrypt from 'bcrypt';
import './role';

/**
 * User schema definition
 */
const UserSchema = new mongoose.Schema({
  role: { type: mongoose.Schema.ObjectId, ref: 'Role' },
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

/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};

/**
 * The pre-save hook method.
 */
UserSchema.pre('save', function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();


  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) {
      return next(saltError);
    }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) {
        return next(hashError);
      }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});

export default mongoose.model('User', UserSchema);
