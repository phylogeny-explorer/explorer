import mongoose from 'mongoose';
import asset from '../../schema/asset';

export default function(connection) {
  const TransactionSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    cycle: {type: mongoose.Schema.ObjectId},
    identifier: {type: mongoose.Schema.ObjectId},
    data: {
      before: {type: Object, default: {}},
      after: {type: Object, default: {}},
    },
    assets: {
      before: [asset],
      after: [asset],
    },
    mode: {
      type: String,
      enum: ['CREATE', 'UPDATE', 'DESTROY'],
    },
    type: {
      type: String,
      enum: ['CLADE', 'USER', 'ROLE', 'SETTINGS'],
    },
    status: {
      type: String,
      enum: ['PENDING', 'DONE', 'FAILED'],
      default: 'DONE',
    },
    created: {type: Date, default: Date.now},
    modified: {type: Date},
  }, {minimize: false});

  return connection.model('transactions', TransactionSchema);
}