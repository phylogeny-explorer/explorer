/*!
 * Phylogeny Explorer
 *
 * @summary Database Connection Configuration
 * @author John Ropas
 * @since 19/09/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const connectionString = 'mongodb://35.162.254.17:27017/phylex-admin';

const options = {
  user: 'phylexadminuser',
  pass: 'ed86ec0502b244519ed3c86f8bf39cf4',
};

const db = mongoose.connect(connectionString, options);

export default db;

