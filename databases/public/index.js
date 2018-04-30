import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');

export { default as Clade } from './models/clade';
export { default as Connection } from './connection';