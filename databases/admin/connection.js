import { database as config} from '../../config';
import dbFactory from '../factory';

const Connection = dbFactory(
  config.admin.user,
  config.admin.password,
  config.hosts,
  config.admin.name,
  config.ssl,
  config.replica_set,
  config.auth_source
);

export default Connection;