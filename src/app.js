/*!
 * Phylogeny Explorer
 *
 * @summary Application bootstrap
 * @author John Ropas
 * @since 19/09/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */
import async from 'async';
import mongoose from 'mongoose';
import Transaction from './models/transaction';
import CP from './components/CentralProcessor';

mongoose.Promise = require('bluebird');

console.log('STARTED');

global.running = false;
doQuery();

function doQuery() {
  if (running) return setTimeout(doQuery, 1000);

  const cycle = new mongoose.Types.ObjectId();

  global.running = true;

  Transaction.find({type: 'CLADE', status: {$in: ['PENDING']}})
    .then((transactions) => {
      if (transactions.length === 0) return;

      console.log(`Found ${transactions.length} transactions. Cycle: ${cycle}`);

      transactions.forEach((transaction, k) => {
        transaction.cycle = cycle;
        console.log(`${k + 1} - Processing transaction Id: ${transaction._id}, Mode: ${transaction.mode}`);
        const cp = new CP(transaction, k, handleError);
        cp.process();
      });

      return null;
    })
    .catch((transactionError) => {
      console.error(transactionError);
    })
    .finally(() => {
      global.running = false;
    })
  ;

  setTimeout(doQuery, 1000);
}


function handleError(err) {
  if (err) console.error(err);
}