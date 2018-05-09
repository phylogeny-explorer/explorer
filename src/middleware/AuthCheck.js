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
import User from 'common/databases/admin/models/user';
import authConfig from '../config/authentication';

/**
 *  The Auth Checker middleware function.
 */
const AuthCheck = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, authConfig.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) {
      return res.status(401).end();
    }

    const userId = decoded.sub;

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }
      req.user = user;
      return next();
    }).populate('role');
  });
};

export default AuthCheck;
