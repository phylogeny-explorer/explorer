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
import CladeForm from './clade/CladeForm';
import CladeTransactionForm from './clade/CladeTransactionForm';
import TransactionList from './TransactionList';
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
      path: '/clades',
      action: async({ next }) => {
        const component = await next();
        if (component !== undefined) {
          return component;
        }
        return undefined;
      },
      children: [
        {
          path: '/evolve/:parentId',
          action: async(context) => {
            const parent = await
              new Request(`/clades/${context.params.parentId}`,
                'GET', {}, Request.endPoints.public).fetch();
            return <CladeForm mode="Create" parent={parent} />;
          },
        },
        {
          path: '/update/:cladeId',
          action: async(context) => {
            const clade = await
              new Request(`/clades/${context.params.cladeId}`,
                'GET', {}, Request.endPoints.public).fetch();
            return <CladeForm mode="Update" clade={clade} />;
          },
        },
        {
          path: '/destroy/:cladeId',
          action: async(context) => {
            const clade = await
              new Request(`/clades/${context.params.cladeId}`,
                'GET', {}, Request.endPoints.public).fetch();
            return <CladeForm mode="Destroy" clade={clade} />;
          },
        },
      ],
    },
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

// .get('/clades/', controller.getClades)
//   .get('/clades/:id/', controller.getClades)
//   .get('/clades/depth/:depth', controller.getClades)
//   .get('/clades/:id/depth/:depth', controller.getClades);
