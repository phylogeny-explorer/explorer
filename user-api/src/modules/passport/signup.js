import PassportLocalStrategy from 'passport-local';
import { User, Role } from 'common/databases/admin/index';

/**
 * Return the Passport Local Strategy object.
 */
const SignUpStrategy = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, (req, username, password, done) => {
  Role.findOne({ isDefault: true }, (errRole, role) => {
    const newUser = new User();
    newUser.role = role._id;
    newUser.title = req.body.title;
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.username = username.trim();
    newUser.password = password.trim();
    newUser.address = req.body.address;
    newUser.postcode = req.body.postcode;
    newUser.phone = req.body.phone;
    newUser.email = req.body.email.trim();
    newUser.dateOfBirth = req.body.dateOfBirth;
    newUser.gender = req.body.gender;
    newUser.coverLetter = req.body.coverLetter;
    newUser.subscribed = req.body.subscribed;
    newUser.isActive = true;
    newUser.isConfirmed = false;
    newUser.created = Date.now();
    newUser.modified = null;
    newUser.save((err) => {
      if (err) {
        return done(err);
      }
      return done(null);
    });
  });
});

export default SignUpStrategy;
