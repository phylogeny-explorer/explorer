import { database as config} from '../../config';
import dbFactory from '../factory';

let adminDb  = null;
let models   = null;

if (config.hosts && config.admin.name) {
  adminDb = dbFactory(
    config.admin.user,
    config.admin.password,
    config.hosts,
    config.admin.name,
    config.ssl,
    config.replica_set,
    config.auth_source
  );

  models = {
    Role        : require('./models/role')(adminDb),
    Rule        : require('./models/rule')(adminDb),
    Setting     : require('./models/setting')(adminDb),
    Transaction : require('./models/transaction')(adminDb),
    User        : require('./models/user')(adminDb)
  };
} else {
  console.log('Admin Database Host or DB Name not set.');
}

export default {
  connection : adminDb,
  Models     : models
};
