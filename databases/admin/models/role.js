import mongoose from 'mongoose';

export default function(connection) {
  const permissionRules = new mongoose.Schema({
    path: {type: String},
    controller: {type: String},
    action: {type: String},
    method: {type: String},
    allow: {type: Boolean},
  }, {_id: false});

  export const RoleSchema = new mongoose.Schema({
    description: {type: String, unique: true},
    isDefault: {type: Boolean, default: false},
    isActive: {type: Boolean, default: false},
    rules: [permissionRules],
    created: {type: Date, default: Date.now},
    modified: {type: Date},
  });

  return connection.model('Role', RoleSchema);
}