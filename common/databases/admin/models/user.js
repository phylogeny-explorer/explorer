import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import connection from '../connection';

const UserSchema = new mongoose.Schema({
  role: { type: mongoose.Schema.ObjectId, ref: 'Role' },
  title: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  passwordResetCode: { type: String, required: false },
  passwordResetExpiry: { type: Date, required: false },
  address: { type: String },
  postcode: { type: String },
  phone: { type: String },
  email: { type: String, unique: true, required: true },
  dateOfBirth: { type: Date },
  gender: { type: String },
  coverLetter: { type: String },
  subscribed: { type: Boolean, default: true },
  isActive: { type: Boolean, default: false },
  isConfirmed: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
  modified: { type: Date },
  referenceCode: { type: String },
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

export default connection.model('User', UserSchema);
