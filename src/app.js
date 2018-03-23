/*!
 * Phylogeny Explorer
 *
 * @summary Application bootstrap
 * @author John Ropas
 * @since 19/09/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */
import minimist from 'minimist';
import async from 'async';
import mongoose from 'mongoose';
import Transaction from './models/transaction';
import CP from './components/CentralProcessor';

const argv = minimist(process.argv.slice(2));

let filter = {};

if (argv.transactionId) {
  filter = { _id: argv.transactionId, status: { $in: ['FAILED', 'PENDING'] } };
} else {
  filter = { type: 'CLADE', status: { $in: ['FAILED', 'PENDING'] } };
}

Transaction.find(filter, (transactionError, transactions) => {
  const cycle = new mongoose.Types.ObjectId();
  if (transactionError) {
    console.error(transactionError);
    process.exit(0);
  }
  console.log(`Found ${transactions.length} transactions. Cycle: ${cycle}`);
  async.forEachOf(transactions, (v, k, callback) => {
    const tr = v;
    tr.cycle = cycle;
    console.log(`${k + 1} - Processing transaction Id: ${tr._id}, Mode: ${tr.mode}`);
    const cp = new CP(tr, k, callback);
    cp.process();
  }, (err) => {
    if (err) {
      console.error('A transaction failed to process');
      console.error(err);
    } else {
      console.log('All transactions have been processed successfully');
      process.exit(0);
    }
  });
});
