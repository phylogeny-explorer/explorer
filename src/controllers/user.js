/*!
 * Phylogeny Explorer
 *
 * @summary User controller class
 * @author John Ropas
 * @since 19/09/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import passwordHash from 'password-hash';
import User from 'common/databases/admin/models/user';
import Modules from '../modules';
import AccessControl from '../middleware/AccessControl';

class UserController extends Modules.Controller {
  constructor() {
    super(AccessControl);
  }

  getUsers(req, res, next) {
    User.find({}, (err, users) => this.handleResponse(res, next, err, users)).populate('role', 'description');
  }

  getUser(req, res, next) {
    const userId = req.params.userId;
    User.findOne({ _id: userId }, (err, user) => this.handleResponse(res, next, err, user))
      .populate('role', 'description');
  }

  createUser(req, res, next) {
    const user = new User();
    user.role = req.body.roleId;
    user.title = req.body.title;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.username = req.body.username;
    user.password = req.body.password;
    user.address = req.body.address;
    user.postcode = req.body.postcode;
    user.phone = req.body.phone;
    user.email = req.body.email;
    user.dateOfBirth = req.body.dateOfBirth;
    user.gender = req.body.gender;
    user.coverLetter = req.body.coverLetter;
    user.subscribed = req.body.subscribed;
    user.isActive = false;
    user.isConfirmed = false;
    user.created = Date.now();
    user.modified = null;
    user.save((err, newUser) => this.handleResponse(res, next, err, newUser));
  }

  updateUser(req, res, next) {
    const userId = req.params.userId;
    User.findOne({ _id: userId }, (err, user) => {
      if (err) {
        return next(err);
      }
      const updatedUser = user;
      updatedUser.role = req.body.roleId;
      updatedUser.title = req.body.title;
      updatedUser.firstName = req.body.firstName;
      updatedUser.lastName = req.body.lastName;
      updatedUser.username = req.body.username;
      updatedUser.address = req.body.address;
      updatedUser.postcode = req.body.postcode;
      updatedUser.phone = req.body.phone;
      updatedUser.email = req.body.email;
      updatedUser.dateOfBirth = req.body.dateOfBirth;
      updatedUser.gender = req.body.gender;
      updatedUser.subscribed = req.body.subscribed;
      updatedUser.coverLetter = req.body.coverLetter;
      updatedUser.modified = Date.now();
      updatedUser.save(err2 => this.handleResponse(res, next, err2, updatedUser));
      return undefined;
    });
  }

  destroyUser(req, res, next) {
    const userId = req.params.userId;
    User.findOne({ _id: userId }).remove((err, deleted) =>
      this.handleResponse(res, next, err, { deleted, userId })
    );
  }

  activateUser(req, res, next) {
    const userId = req.params.userId;
    User.findOne({ _id: userId }, (err, user) => {
      if (err) {
        return next(err);
      }
      const updatedUser = user;
      updatedUser.isActive = true;
      updatedUser.save(err2 => this.handleResponse(res, next, err2, user));
      return undefined;
    });
  }

  deactivateUser(req, res, next) {
    const userId = req.params.userId;
    User.findOne({ _id: userId }, (err, user) => {
      if (err) {
        return next(err);
      }
      const updatedUser = user;
      updatedUser.isActive = false;
      updatedUser.save(err2 => this.handleResponse(res, next, err2, user));
      return undefined;
    });
  }

  confirmUser(req, res, next) {
    const userId = req.params.userId;
    User.findOne({ _id: userId }, (err, user) => {
      if (err) {
        return next(err);
      }
      const updatedUser = user;
      updatedUser.isConfirmed = true;
      updatedUser.save(err2 => this.handleResponse(res, next, err2, user));
      return undefined;
    });
  }

  disapproveUser(req, res, next) {
    const userId = req.params.userId;
    User.findOne({ _id: userId }, (err, user) => {
      if (err) {
        return next(err);
      }
      const updatedUser = user;
      updatedUser.isConfirmed = false;
      updatedUser.save(err2 => this.handleResponse(res, next, err2, user));
      return undefined;
    });
  }

  assignUserRole(req, res, next) {
    const userId = req.params.userId;
    User.findOne({ _id: userId }, (err, user) => {
      if (err) {
        return next(err);
      }
      const updatedUser = user;
      updatedUser.role = req.body.roleId;
      updatedUser.save(err2 => this.handleResponse(res, next, err2, user));
      return undefined;
    });
  }
}
export default UserController;
