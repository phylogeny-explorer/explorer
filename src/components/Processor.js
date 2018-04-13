import mongoose from "mongoose";
import Transaction from "../models/transaction";
import CP from "./CentralProcessor";

class Processor {
  constructor(timeout) {
    this._timeout = timeout || 1000;

    // Do some icky bindings so we don't have to every time we use a function. Yuck.
    this.start = this.start.bind(this);
    this.doQuery = this.doQuery.bind(this);
    this.loop = this.loop.bind(this);
    this.handleError = this.handleError.bind(this);
    this.processTransactions = this.processTransactions.bind(this);
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
    setTimeout(this.doQuery, this._timeout); // running on a timeout prevents overloading the system
  }

  handleError(err) {
    if (err) console.error(err);
    return null;
  }

  processTransactions(transactions) {
    if (transactions.length === 0) return;

    // const cycle = new mongoose.Types.ObjectId();
    // console.log(`Found ${transactions.length} transactions. Cycle: ${cycle}`);

    transactions.forEach((transaction, k) => {
      // transaction.cycle = cycle;
      console.log(`${k + 1} - Processing transaction Id: ${transaction._id}, Mode: ${transaction.mode}`);
      // const cp = new CP(transaction, k, this.handleError);
      // cp.process();
    });

    return null;
  }
}


export default Processor;