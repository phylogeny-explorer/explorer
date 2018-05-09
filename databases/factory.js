import mongoose from 'mongoose';
import querystring from 'querystring';

function databaseFactory(user, pass, hosts, dbName, ssl, replicaSet, authSource) {
  let query = { ssl };
  if (replicaSet) query['replicaSet'] = replicaSet;
  if (authSource) query['authSource'] = authSource;

  let connectionString = hosts + '/' + dbName + '?' + querystring.stringify(query);

  const db = mongoose.createConnection("mongodb://" + connectionString, user ? { user, pass } : null);

  db.on('connected', function() {
    console.log('Connected to ' + connectionString);
  });

  db.on('error', function(err) {
    console.log('Failed to connect to ' + connectionString + ' -- ' + err);
  });

  db.on('disconnected', function () {
    console.log('Disconnected from ' + connectionString);
  });

  db.catch(function(err) {
    console.log('Failed to connect to ' + connectionString + ' -- ' + err)
  });

  return db;
}

export default databaseFactory;