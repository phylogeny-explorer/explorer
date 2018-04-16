import mongoose from 'mongoose';

export default function(connection) {
  const UserSchema = new mongoose.Schema({
    title: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    address: {type: String, required: true},
    postcode: {type: String, required: true},
    phone: {type: String},
    email: {type: String, unique: true, required: true},
    dateOfBirth: {type: Date},
    gender: {type: String, required: true},
    coverLetter: {type: String},
    subscribed: {type: Boolean, default: true},
    isActive: {type: Boolean, default: false},
    isConfirmed: {type: Boolean, default: false},
    created: {type: Date, default: Date.now},
    modified: {type: Date},
  });

  return connection.model('User', UserSchema);
}