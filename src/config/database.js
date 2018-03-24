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

const authString = process.env.DB_USER ? process.env.DB_USER + ':' + process.env.DB_PASS + '@' : '';
const connectionString = 'mongodb://'+authString+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME;
const db = mongoose.connect(connectionString, { useMongoClient: true });

export default db;