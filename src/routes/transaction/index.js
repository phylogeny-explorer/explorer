/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 16/11/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import React from 'react';
import CladeTransactionForm from '../../components/Transaction/Form';
import TransactionList from '../../components/Transaction/List';
import Request from '../../core/Request';

export default {
  path: '/transactions',
  action: async({ next }) => {
    const component = await next();
    if (component !== undefined) {
      return component;
    }
    return undefined;
  },

  children: [
    {
      path: '/',
      action: async({ next }) => {
        const component = await next();
        if (component !== undefined) {
          return component;
        }
        return undefined;
      },
      children: [
        {
          path: '/',
          action: async() => {
            const transactions = await
              new Request('/transactions', 'GET').fetch();
            return <TransactionList transactions={transactions} />;
          },
        },
        {
          path: '/update/:transactionId',
          action: async(context) => {
            const transaction = await
              new Request(`/transactions/${context.params.transactionId}`, 'GET').fetch();
            return <CladeTransactionForm mode="Update" transaction={transaction} />;
          },
        },
        {
          path: '/destroy/:transactionId',
          action: async(context) => {
            const transaction = await
              new Request(`/transactions/${context.params.transactionId}`, 'GET').fetch();
            return <CladeTransactionForm mode="Destroy" transaction={transaction} />;
          },
        },
      ],
    },
  ],
};