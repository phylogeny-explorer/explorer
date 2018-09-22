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
import UserList from './UserList';
import UserForm from './UserForm';
import Request from '../../core/Request';

export default {
  path: '/users',
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
        const users = await new Request('/users', 'GET').fetch();
        return <UserList users={users} />;
      },
    },
    {
      path: '/create',
      action: async() => {
        const activeRoles = await new Request('/roles/active', 'GET').fetch();
        return <UserForm mode="Create" activeRoles={activeRoles} />;
      },
    },
    {
      path: '/update/:id',
      action: async(context) => {
        const activeRoles = await new Request('/roles/active', 'GET').fetch();
        const user = await new Request(`/users/${context.params.id}`, 'GET').fetch();
        return <UserForm mode="Update" user={user} activeRoles={activeRoles} />;
      },
    },
    {
      path: '/destroy/:id',
      action: async(context) => {
        const activeRoles = await new Request('/roles/active', 'GET').fetch();
        const user = await new Request(`/users/${context.params.id}`, 'GET').fetch();
        return <UserForm mode="Destroy" user={user} activeRoles={activeRoles} />;
      },
    },
  ],
};
