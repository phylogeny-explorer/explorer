import mongoose from 'mongoose';
import adminDb from './admin';
import publicDb from './public';

mongoose.Promise = require('bluebird');

export default {
  Admin: adminDb,
  Public: publicDb
};