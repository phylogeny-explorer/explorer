/**
 * Module dependencies
 */

import userRouter from './users';
import roleRouter from './roles';
import ruleRouter from './rules';
import authRouter from './auth';
import settingsRouter from './settings';
import transactionsRouter from './transactions';
import assetsRouter from './assets';
import authCheckMiddleware from '../middleware/AuthCheck';

export default (app) => {
  app.use('/', authRouter);
  app.use('/', authCheckMiddleware, userRouter);
  app.use('/', authCheckMiddleware, roleRouter);
  app.use('/', authCheckMiddleware, ruleRouter);
  app.use('/', authCheckMiddleware, settingsRouter);
  app.use('/', authCheckMiddleware, transactionsRouter);
  app.use('/', authCheckMiddleware, assetsRouter);
};
