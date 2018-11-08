import jwt from 'jsonwebtoken';
import { User } from 'common/databases/admin';
import { auth } from 'common/config';

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
  return jwt.verify(token, auth.jwt.secret, (err, decoded) => {
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
