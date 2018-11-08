import mongoose from 'mongoose';
import Processor from './components/Processor';

global.Promise = require('bluebird');
mongoose.Promise = global.Promise;

const p = new Processor();
p.start();
