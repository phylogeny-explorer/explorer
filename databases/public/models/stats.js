import mongoose from 'mongoose';
import connection from '../connection';

const StatsSchema = new mongoose.Schema({
  clades: Number,
  species: Number,
  extantTrue: Number,  // extant true
  extantFalse: Number,  // extant false
  extantNull: Number,  // extant null
  timestamp: { type: Date, default: () => new Date(), index: true, unique: true },
});

// eslint-disable-next-line func-names
StatsSchema.static('getLatest', function (cb) {
  this.find().sort('-timestamp').limit(1)
    .exec()
    .then(stats => cb(null, stats[0]))
    .catch(err => cb(err));
});

export default connection.model('Stat', StatsSchema);
