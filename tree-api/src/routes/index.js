/**
 * Module dependencies
 */

import cladeRouter from './clade';

export default (app) => {
  app.use('/', cladeRouter);
};
