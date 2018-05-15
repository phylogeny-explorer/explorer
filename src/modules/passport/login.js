/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 27/12/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import jwt from 'jsonwebtoken';
import PassportLocalStrategy from 'passport-local';
import { User } from 'common/databases/admin';
import { auth } from 'common/config';

/**
 * Return the Passport Local Strategy object.
 */
const LoginStrategy = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, (req, username, password, done) => {
  const userData = {
    username: username.trim(),
    password: password.trim(),
  };

  // find a user by email address
  return User.findOne({ username: userData.username, isConfirmed: true, isActive: true }, (err, user) => {
    if (err) {
      return done(err);
    }

    if (!user) {
      const error = new Error("Incorrect username, password or user hasn't been confirmed yet");
      error.name = 'IncorrectCredentialsError';

      return done(error);
    }

    // check if a hashed user's password is equal to a value saved in the database
    return user.comparePassword(userData.password, (passwordErr, isMatch) => {
      if (err) {
        return done(err);
      }

      if (!isMatch) {
        const error = new Error('Incorrect username or password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      }

      const payload = {
        sub: user._id,
      };

      // create a token string
      const token = jwt.sign(payload, auth.jwt.secret);
      const data = {
        username: user.username,
        role: user.role.description,
      };

      return done(null, token, data);
    });
  }).populate('role');
});

export default LoginStrategy;