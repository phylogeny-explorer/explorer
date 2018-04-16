import mongoose from 'mongoose';

export default function(connection) {
  const RuleSchema = new mongoose.Schema({
    path: {type: String},
    method: {type: String},
    controller: {type: String},
    action: {type: String},
    created: {type: Date, default: Date.now},
    modified: {type: Date},
  });

  return connection.model('Rule', RuleSchema);
}