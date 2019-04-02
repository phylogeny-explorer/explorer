import mongoose from 'mongoose';
import querystring from 'querystring';

function databaseFactory(user, pass, hosts, dbName, ssl, replicaSet, authSource) {
  let query = { ssl };
  if (replicaSet) query['replicaSet'] = replicaSet;
  if (authSource) query['authSource'] = authSource;

  let connectionString = hosts + '/' + dbName + '?' + querystring.stringify(query);
  
  mongoose.set('debug', true);

  const db = mongoose.createConnection("mongodb://" + user + ":" + pass + "@" + connectionString);

  db.on('connected', function() {
    console.log('Connected to ' + connectionString);
  });

  db.on('error', function(err) {
    console.log('Failed to connect to ' + connectionString + ' -- ' + err);
  });

  db.on('disconnected', function () {
    console.log('Disconnected from ' + connectionString);
  });

  return db;
}

export default databaseFactory;