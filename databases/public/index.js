import {database as config} from "../../config";
import dbFactory from '../factory';

let publicDb = null;
let models   = null;

if (config.hosts && config.public.name) {
  publicDb = dbFactory(
    config.public.user,
    config.public.password,
    config.hosts,
    config.public.name,
    config.ssl,
    config.replica_set,
    config.auth_source
  );

  models = {
    Clade : require('./models/clade')(publicDb)
  };
} else {
  console.log('Public Database Host or DB Name not set.');
}

export default {
  connection : publicDb,
  Models     : models
};
