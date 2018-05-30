import mongoose from "mongoose";
import { Transaction } from "common/databases/admin";
import CTP from './CladeTransactionProcessor';

const TIMEOUT = 1000;

class Processor {
  constructor() {
    this.start = this.start.bind(this);
    this.doQuery = this.doQuery.bind(this);
    this.loop = this.loop.bind(this);
    this.handleError = this.handleError.bind(this);
    this.processTransactions = this.processTransactions.bind(this);
    this.process = this.process.bind(this);
  }

  start() {
    console.log('STARTED');
    this.doQuery();
  }

  doQuery() {
    Transaction
      .find({type: 'CLADE', status: {$in: ['PENDING']}})
      .then(this.processTransactions)
      .catch(this.handleError)
      .finally(this.loop)
    ;
  }

  loop() {
    setTimeout(this.doQuery, TIMEOUT); // running on a timeout prevents overloading the system
  }

  handleError(err) {
    console.error(err);
  }

  processTransactions(transactions) {
    if (transactions.length === 0) return;

    const cycle = new mongoose.Types.ObjectId();
    console.log(`Found ${transactions.length} transactions. Cycle: ${cycle}`);
    return Promise.all(transactions.map((transaction, i) => this.process(transaction, i, cycle)));
  }

  process(transaction, i, cycle) {
    transaction.cycle = cycle;
    console.log(`${i + 1} - Processing transaction Id: ${transaction._id}, Mode: ${transaction.mode}`);

    const ctp = new CTP(transaction);

    switch (transaction.mode) {
      case 'UPDATE':
        return ctp.updateClade();

      case 'CREATE':
        return ctp.createClade();

      case 'DESTROY':
        return ctp.destroyClade();

      default:
        throw new Error('Unknown transaction mode: ' + transaction.mode);
    }
  }
}


export default Processor;