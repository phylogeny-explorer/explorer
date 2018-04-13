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

let connectionUser= process.env.ADMIN_DB_USER ? (process.env.ADMIN_DB_USER+':'+process.env.ADMIN_DB_PASS+'@') : '';
let connectionString = process.env.DB_HOSTS;
connectionString += '/' + process.env.ADMIN_DB_NAME;
connectionString += '?ssl=' + process.env.DB_SSL;
connectionString += process.env.DB_REPLICA_SET.length ? '&replicaSet=' + process.env.DB_REPLICA_SET : '';
connectionString += process.env.DB_AUTH_SOURCE.length ? '&authSource=' + process.env.DB_AUTH_SOURCE : '';

const db = mongoose.createConnection("mongodb://" + connectionUser + connectionString, { useMongoClient: true });

db.on('connected', function() {
  console.log('Connected to ' + connectionString);
});

db.on('error', function(err) {
  console.log('Failed to connect to ' + connectionString + ' -- ' + err);
});

db.on('disconnected', function () {
  console.log('Disconnected from ' + connectionString);
});

export default db;