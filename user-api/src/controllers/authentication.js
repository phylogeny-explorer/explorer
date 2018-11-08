import validator from 'validator';
import passport from 'passport';
import generator from 'generate-password';
import { User } from 'common/databases/admin';
import { SES } from 'common/aws';
import { config } from 'common/config';

const AuthenticationController = {
  /**
   * Validate the sign up form
   *
   * @param {object} payload - the HTTP body message
   * @returns {object} The result of validation. Object contains a boolean
   *          validation result, errors tips, and a global message for the whole
   *          form.
   */
  _validateSignupForm: (payload) => {
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
    } else {
      payload.password = payload.password.trim();
    }

    if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
      isFormValid = false;
      errors.name = 'Please provide your username.';
    } else {
      payload.username = payload.username.trim();
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
   * @returns {object} The result of validation. Object contains a boolean
   *          validation result, errors tips, and a global message for the whole
   *          form.
   */
  _validateLoginForm: (payload) => {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
      isFormValid = false;
      errors.username = 'Please provide your username.';
    } else {
      payload.username = payload.username.trim();
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
      isFormValid = false;
      errors.password = 'Please provide your password.';
    } else {
      payload.password = payload.password.trim();
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
   * @returns {object} The result of validation. Object contains a boolean
   *          validation result, errors tips, and a global message for the whole
   *          form.
   */
  _validateForgotForm: (payload) => {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
      isFormValid = false;
      errors.username = 'Please provide your username or email address.';
    } else {
      payload.username = payload.username.trim();
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
   * Validate the password reset form
   *
   * @param {object} payload - the HTTP body message
   * @returns {object} The result of validation. Object contains a boolean
   *          validation result, errors tips, and a global message for the whole
   *          form.
   */
  _validatePasswordResetForm: (payload) => {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
      isFormValid = false;
      errors.username = 'The username is missing.';
    } else {
      payload.username = payload.username.trim();
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
      isFormValid = false;
      errors.password = 'Please provide a password.';
    } else {
      payload.password = payload.password.trim();
    }

    if (!payload || typeof payload.repeat_password !== 'string' || payload.repeat_password.trim().length === 0) {
      isFormValid = false;
      errors.repeat_password = 'Enter the password a second time.';
    } else {
      payload.repeat_password = payload.repeat_password.trim();
    }

    if (isFormValid && payload.repeat_password !== payload.password) {
      isFormValid = false;
      errors.repeat_password = 'The second password does not match the first one.';
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
    const validationResult = AuthenticationController._validateSignupForm(req.body);
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
    const validationResult = AuthenticationController._validateLoginForm(req.body);
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
    const validationResult = AuthenticationController._validateForgotForm(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors,
      });
    }

    return User.findOne({ $or: [{ username: req.body.username }, { email: req.body.username }], isActive: true }, (err, user) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Can't find username or email. Check the spelling. This user may not exist -- you should register.",
        });
      }

      user.passwordResetCode = generator.generate({
        length: 16,
        numbers: true,
        excludeSimilarCharacters: false,
        symbols: false,
      });

      user.passwordResetExpiry = new Date((new Date()).getTime() + (30 * 60000)); // 30 minutes expiry

      user.save((err, user) => {
        if (err) {
          console.error("User update error: Can't save password reset code.", err);
          return res.status(400).json({
            success: false,
            message: "Can't save password reset code.",
          });
        }

        SES.sendEmailTemplate(user.email, 'PasswordResetCode', {
          username: user.username,
          url: `https://${config.url}/password-reset?resetCode=${user.passwordResetCode}&username=${user.username}`
        });

        return res.status(200).json({
          success: true,
          message: `Your temporary password was sent to ${user.email}`,
        });
      });
    });
  },

  passwordReset: (req, res, next) => {
    const validationResult = AuthenticationController._validatePasswordResetForm(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors,
      });
    }
    return User.findOne({
      passwordResetCode: req.body.resetCode,
      username: req.body.username,
      passwordResetExpiry: { $gt: Date.now() }, isActive: true }, (err, user) => {
      if (err) {
        console.error('Error getting password reset code ' + err);
        return next(err);
      }

      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Invalid reset code. This one might be expired. Reset your password again.',
        });
      }
      user.password = req.body.password;
      user.passwordResetCode = null;
      user.passwordResetExpiry = null;
      user.save((err) => {
        if (err) {
          console.error('Error saving user password: ', err);
          return res.status(400).json({
            success: false,
            message: "Can't save password.",
          });
        }
        return res.status(200).json({
          success: true,
          message: 'Your new password is saved.',
        });
      });
    });
  },

  logout: () => {},
};

export default AuthenticationController;
