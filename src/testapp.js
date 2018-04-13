import mongoose from 'mongoose';
import Transaction from './models/transaction';

mongoose.Promise = require('bluebird');
mongoose.set('debug', true);

let filter = { type: 'CLADE', status: { $in: ['PENDING'] } };

setTimeout(function() {
  Transaction
    .find(filter)
    .then((transactions) => {
      return console.log(transactions)
    })
    .then(runagain)
    .catch((err) => {
      console.error(err);
    })
  ;
}, 5000);

function runagain() {
  return Transaction.find(filter)
    .then((transactions) => {
      console.log('SECTION 2');
      console.log(transactions);
    });
}