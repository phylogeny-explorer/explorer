/*!
 * Phylogeny Explorer
 *
 * @summary 
 * @author John Ropas
 * @since 30/11/2016
 * 
 * Copyright(c) 2016 Phylogeny Explorer
 */


import mongoose from 'mongoose';

const connectionString = 'mongodb://35.162.254.17:27017/phylex-admin';

const options = {
  user: 'phylexadminuser',
  pass: 'ed86ec0502b244519ed3c86f8bf39cf4',
};

const adminConn = mongoose.createConnection(connectionString, options);

export default adminConn;