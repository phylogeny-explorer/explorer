import React from 'react';
import RoleList from './RoleList';
import RoleForm from './RoleForm';
import Request from '../../core/Request';

export default {
  path: '/roles',
  action: async({ next }) => {
    const component = await next();
    if (component !== undefined) {
      return component;
    }
    return undefined;
  },

  children: [
    {
      path: '/create',
      action: async() => {
        const rules = await new Request('/rules', 'GET').fetch();
        return <RoleForm mode="Create" rules={rules} />;
      },
    },
    {
      path: '/update/:id',
      action: async(context) => {
        const rules = await new Request('/rules', 'GET').fetch();
        const role = await new Request(`/roles/${context.params.id}`, 'GET').fetch();
        return <RoleForm mode="Update" rules={rules} role={role} />;
      },
    },
    {
      path: '/destroy/:id',
      action: async(context) => {
        const role = await new Request(`/roles/${context.params.id}`, 'GET').fetch();
        return <RoleForm mode="Destroy" role={role} rules={[]} />;
      },
    },
    {
      path: '/',
      action: async() => {
        const roles = await new Request('/roles', 'GET').fetch();
        return <RoleList roles={roles} />;
      },
    },
  ],
};
