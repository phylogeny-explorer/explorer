/*!
 * Phylogeny Explorer
 *
 * @summary Register all routers
 * @author John Ropas
 * @since 19/09/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

/**
 * Module dependencies
 */

import cladeRouter from './clade';

export default (app) => {
  app.use('/', cladeRouter);
};
