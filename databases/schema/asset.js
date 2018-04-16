import mongoose from 'mongoose';

const asset = new mongoose.Schema({
  name: { type: String },
  isDefault: { type: Boolean },
  folder: { type: String },
}, { _id: false });

export default asset;
