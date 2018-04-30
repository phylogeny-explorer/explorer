import {database as config} from "../../config";
import dbFactory from '../factory';

export default dbFactory(
  config.public.user,
  config.public.password,
  config.hosts,
  config.public.name,
  config.ssl,
  config.replica_set,
  config.auth_source
);