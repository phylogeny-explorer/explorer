/*!
 * Phylogeny Explorer
 *
 * @summary Application bootstrap
 * @author John Ropas
 * @since 19/09/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */
import mongoose from 'mongoose';
import Processor from './components/Processor';

global.Promise = require('bluebird');
mongoose.Promise = global.Promise;

const p = new Processor();
p.start();
