import dbFactory from '../factory';
import Clade from './models/clade';

let publicDb = null;
let models = null;

if (process.env.PUBLIC_DB_NAME) {
  publicDb = dbFactory(
    process.env.PUBLIC_DB_USER,
    process.env.PUBLIC_DB_PASS,
    process.env.DB_HOSTS,
    process.env.PUBLIC_DB_NAME,
    process.env.DB_SSL,
    process.env.DB_REPLICA_SET,
    process.env.DB_AUTH_SOURCE
  );

  models = {
    Clade: Clade(publicDb)
  };
}

export default publicDb;
export const Models = models;