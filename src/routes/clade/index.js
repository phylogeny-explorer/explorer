/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 21/10/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import React from 'react';
import Cladogram from './Cladogram';
import CladeView from './CladeView';
import Request from '../../core/Request';
import Auth from '../../components/Auth';
import history from '../../core/history';

export default {
  path: '/clades',
  action: async({ next }) => {
    if (Auth.isUserAuthenticated()) {
      const component = await next();
      if (component !== undefined) {
        return component;
      }
    }
    history.push('/');
  },

  children: [
    {
      path: '/',
      action: async() => {
        if (!Auth.isUserAuthenticated()) {
          return '';
        }
        const response = await new Request('/clades/tree',
          'GET', {}, Request.endPoints.public).fetch();
        return (
          <Cladogram
            root={response.root}
            depth={response.depth}
            total={response.total}
            actualDepth={response.actualDepth}
          />);
      },
    },
    {
      path: '/:id',
      action: async(context) => {
        if (!Auth.isUserAuthenticated()) {
          return '';
        }
        const response = await new Request(`/clades/tree/${context.params.id}`,
          'GET', {}, Request.endPoints.public).fetch();
        return (
          <Cladogram
            root={response.root}
            depth={response.depth}
            total={response.total}
            actualDepth={response.actualDepth}
          />);
      },
    },
    {
      path: '/depth/:depth',
      action: async(context) => {
        if (!Auth.isUserAuthenticated()) {
          return '';
        }
        const response = await new Request(`/clades/tree/depth/${context.params.depth}`,
          'GET', {}, Request.endPoints.public).fetch();
        return (
          <Cladogram
            root={response.root}
            depth={response.depth}
            total={response.total}
            actualDepth={response.actualDepth}
          />);
      },
    },
    {
      path: '/:id/depth/:depth',
      action: async(context) => {
        if (!Auth.isUserAuthenticated()) {
          return '';
        }
        const response = await
          new Request(`/clades/tree/${context.params.id}/depth/${context.params.depth}`,
            'GET', {}, Request.endPoints.public).fetch();
        return (
          <Cladogram
            root={response.root}
            depth={response.depth}
            total={response.total}
            actualDepth={response.actualDepth}
          />);
      },
    },
    {
      path: '/info/:id',
      action: async(context) => {
        if (!Auth.isUserAuthenticated()) {
          return '';
        }
        const clade = await
          new Request(`/clades/${context.params.id}`,
            'GET', {}, Request.endPoints.public).fetch();
        return <CladeView clade={clade} />;
      },
    },
  ],
};
