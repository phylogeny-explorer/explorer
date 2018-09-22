import mongoose from 'mongoose';
import connection from '../connection';

const RuleSchema = new mongoose.Schema({
  path: {type: String},
  method: {type: String},
  controller: {type: String},
  action: {type: String},
  created: {type: Date, default: Date.now},
  modified: {type: Date},
});

export default connection.model('Rule', RuleSchema);
