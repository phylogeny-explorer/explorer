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

const connectionString = 'mongodb://35.162.254.17:27017/phylex-public';

const options = {
  user: 'phylexpublicuser',
  pass: '53010c7ca48711e680f576304dec7eb7',
};

const publicConn = mongoose.createConnection(connectionString, options);

export default publicConn;
