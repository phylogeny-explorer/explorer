/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 06/10/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import validator from 'validator';
import passport from 'passport';
import { User } from 'common/databases/admin';

const AuthenticationController = {
  /**
   * Validate the sign up form
   *
   * @param {object} payload - the HTTP body message
   * @returns {object} The result of validation. Object contains a boolean validation result,
   *                   errors tips, and a global message for the whole form.
   */
  validateSignupForm: (payload) => {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
      isFormValid = false;
      errors.email = 'Please provide a correct email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
      isFormValid = false;
      errors.password = 'Password must have at least 8 characters.';
    }

    if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
      isFormValid = false;
      errors.name = 'Please provide your username.';
    }

    if (!isFormValid) {
      message = 'Check the form for errors.';
    }
    return {
      success: isFormValid,
      message,
      errors,
    };
  },


  /**
   * Validate the login form
   *
   * @param {object} payload - the HTTP body message
   * @returns {object} The result of validation. Object contains a boolean validation result,
   *                   errors tips, and a global message for the whole form.
   */
  validateLoginForm: (payload) => {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
      isFormValid = false;
      errors.username = 'Please provide your username.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
      isFormValid = false;
      errors.password = 'Please provide your password.';
    }

    if (!isFormValid) {
      message = 'Check the form for errors.';
    }

    return {
      success: isFormValid,
      message,
      errors,
    };
  },

  /**
   * Validate the forgot form
   *
   * @param {object} payload - the HTTP body message
   * @returns {object} The result of validation. Object contains a boolean validation result,
   *                   errors tips, and a global message for the whole form.
   */
  validateForgotForm: (payload) => {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
      isFormValid = false;
      errors.username = 'Please provide your username or email address.';
    }

    if (!isFormValid) {
      message = 'Check the form for errors.';
    }

    return {
      success: isFormValid,
      message,
      errors,
    };
  },

  signup: (req, res, next) => {
    const validationResult = AuthenticationController.validateSignupForm(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors,
      });
    }
    return passport.authenticate('local-signup', (err) => {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          // the 11000 Mongo code is for a duplication email error
          // the 409 HTTP status code is for conflict error
          return res.status(409).json({
            success: false,
            message: 'Check the form for errors.',
            errors: {
              email: 'This email is already taken.',
            },
          });
        }

        return res.status(400).json({
          success: false,
          message: 'Could not process the form.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'You have successfully signed up! Now you should be able to log in.',
      });
    })(req, res, next);
  },

  login: (req, res, next) => {
    const validationResult = AuthenticationController.validateLoginForm(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors,
      });
    }

    return passport.authenticate('local-login', (err, token, userData) => {
      if (err) {
        if (err.name === 'IncorrectCredentialsError') {
          return res.status(400).json({
            success: false,
            message: err.message,
          });
        }

        return res.status(400).json({
          success: false,
          message: 'Could not process the form.',
        });
      }


      return res.json({
        success: true,
        message: 'You have successfully logged in!',
        token,
        user: userData,
      });
    })(req, res, next);
  },

  forgot: (req, res, next) => {
    const validationResult = AuthenticationController.validateForgotForm(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors,
      });
    }

    return User.findOne({ $or: [ {username: req.body.username},{email: req.body.username} ], isActive: true }, (err, user) => {

        if (err) {
	    	return next(err);
        }

        if (!user) {
    		return res.status(400).json({
                success: true,
                message: "Can't find username or email. Check the spelling. This user may not exist -- you should register."
              });
        }

        return res.status(200).json({
            success: true,
            message: "Your temporary password was sent to " + user.email ,
          });
    });
  },

  logout: (req, res, next) => {

  },
};

export default AuthenticationController;
