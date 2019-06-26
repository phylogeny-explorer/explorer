import mongoose from 'mongoose';
import querystring from 'querystring';

function databaseFactory(user, pass, hosts, dbName, ssl, replicaSet, authSource) {
  let query = { ssl };
  if (replicaSet) query['replicaSet'] = replicaSet;
  if (authSource) query['authSource'] = authSource;

  let connectionString = hosts + '/' + dbName + '?' + querystring.stringify(query);
  
  mongoose.set('debug', true);

  let fullConnectionString = ''
  
  if (user != "" && pass != "" && ssl){
    fullConnectionString = "mongodb://" + user + ":" + pass + "@" + connectionString;
  }else{
    fullConnectionString = "mongodb://" + connectionString;
  }

  const db = mongoose.createConnection(fullConnectionString)

  db.on('connected', function() {
    console.log('Connected to ' + connectionString + "with user" + user +"/"+pass);
    console.log(process.env);
  });

  db.on('error', function(err) {
    console.log('Failed to connect to ' + connectionString + ' -- ' + err+ "with user" + user +"/"+pass);
    console.log(process.env);
  });

  db.on('disconnected', function () {
    console.log('Disconnected from ' + connectionString+ "with user" + user +"/"+pass);
    console.log(process.env);
  });

  return db;
}

export default databaseFactory;
