import mongoose from 'mongoose';

function databaseFactory(user, pass, hosts, dbName, useSsl, replicaSet, authSource) {
  let connectionUser= user ? (user+':'+pass+'@') : '';
  let connectionString = hosts;
  connectionString += '/' + dbName;
  connectionString += '?ssl=' + useSsl;
  connectionString += replicaSet.length ? '&replicaSet=' + replicaSet : '';
  connectionString += authSource.length ? '&authSource=' + authSource : '';

  const db = mongoose.createConnection("mongodb://" + connectionUser + connectionString);

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