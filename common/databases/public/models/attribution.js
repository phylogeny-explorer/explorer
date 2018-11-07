import mongoose from 'mongoose';
import connection from '../connection';
import { AttributionType, SensuLabel } from '../constants';

// The date is a string because it can be formatted in a variety of ways such as 1995, '95, January 1995, 01/95, etc.
const AttributionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: Object.keys(AttributionType),
    default: AttributionType.Original,
    required: [true, 'Missing attribution type'],
  },
  name: {
    type: String,
    required: [true, 'Missing attribution author name'],
  },
  date: {
    type: String,
    required: [true, 'Missing attribution date'],
  },
  isImplied: {
    type: Boolean,
    default: false,
    required: false,
  },
  sensuClade: {
    type: String,
    required: false,
  },
  sensuLabel: {
    type: String,
    enum: Object.keys(SensuLabel),
    required: false,
  },
  emendedOldName: {
    type: String,
    required: false,
  },
});

AttributionSchema.methods.copyFrom = function(toCopy) {
  this.type = toCopy.type;
  this.name = toCopy.name;
  this.date = toCopy.date;
  this.isImplied = toCopy.isImplied;
  this.sensuClade = toCopy.sensuClade;
  if(toCopy.sensuLabel) {
    this.sensuLabel = toCopy.sensuLabel;
  }
  this.emendedOldName = toCopy.emendedOldName;
};

Object.assign(AttributionSchema.statics, {
  AttributionType,
  SensuLabel,
});

export default connection.model('Attribution', AttributionSchema);
