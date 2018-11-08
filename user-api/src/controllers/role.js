import { Controller } from '../modules';
import { Role } from 'common/databases/admin';
import AccessControl from '../middleware/AccessControl';

class RoleController extends Controller {

  constructor() {
    super(AccessControl);
  }

  getActiveRoles(req, res, next) {
    Role.find({ isActive: true }, 'description isDefault',
      (err, roles) => this.handleResponse(res, next, err, roles));
  }

  getRoles(req, res, next) {
    Role.find({}, (err, roles) => this.handleResponse(res, next, err, roles));
  }

  getRole(req, res, next) {
    const roleId = req.params.roleId;
    Role.findOne({ _id: roleId }, (err, role) => this.handleResponse(res, next, err, role));
  }

  createRole(req, res, next) {
    const role = new Role();
    role.description = req.body.description;
    role.isActive = req.body.isActive;
    role.created = Date.now();
    role.modified = null;
    role.rules = req.body.rules;
    role.save((err, newRole) => this.handleResponse(res, next, err, newRole));
  }

  updateRole(req, res, next) {
    const roleId = req.params.roleId;
    Role.findOne({ _id: roleId }, (err, role) => {
      if (err) {
        return next(err);
      }
      const updatedRole = role;
      updatedRole.description = req.body.description;
      updatedRole.isActive = req.body.isActive;
      updatedRole.modified = Date.now();
      updatedRole.rules = req.body.rules;
      updatedRole.save(err2 => this.handleResponse(res, next, err2, updatedRole));
      return undefined;
    });
  }

  destroyRole(req, res, next) {
    const roleId = req.params.roleId;
    Role.findOne({ _id: roleId }).remove((err, deleted) =>
      this.handleResponse(res, next, err, { deleted, roleId })
    );
  }

  setDefaultRole(req, res, next) {
    const roleId = req.params.roleId;
    Role.findOne({ _id: roleId }, (err, foundRole) => {
      if (err) {
        return next(err);
      }
      Role.find({}, (err2, roles) => {
        roles.forEach((role) => {
          const updatedRole = role;
          updatedRole.isDefault = foundRole._id.equals(role._id);
          updatedRole.save();
        });
        this.handleResponse(res, next, err2, roleId);
      });
      return undefined;
    });
  }
}

export default RoleController;
