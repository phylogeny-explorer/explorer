import passport from 'passport';
import localSignupStrategy from './signup';
import localLoginStrategy from './login';

export default (app) => {
  app.use(passport.initialize());
  passport.use('local-signup', localSignupStrategy);
  passport.use('local-login', localLoginStrategy);
}