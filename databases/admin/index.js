import dbFactory from '../factory';
import Role from './models/role';
import Rule from './models/rule';
import Setting from './models/setting';
import Transaction from './models/transaction';
import User from './models/user';

let adminDb  = null;
let models = null;

if (process.env.ADMIN_DB_NAME) {
  adminDb = dbFactory(
    process.env.ADMIN_DB_USER,
    process.env.ADMIN_DB_PASS,
    process.env.DB_HOSTS,
    process.env.ADMIN_DB_NAME,
    process.env.DB_SSL,
    process.env.DB_REPLICA_SET,
    process.env.DB_AUTH_SOURCE
  );

  models = {
    Role: Role(adminDb),
    Rule: Rule(adminDb),
    Setting: Setting(adminDb),
    Transaction: Transaction(adminDb),
    User: User(adminDb)
  };
}

export default {
  connection: adminDb,
  Models: models
};
