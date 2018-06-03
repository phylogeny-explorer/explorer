import React from 'react';
import Request from '../core/Request';

export default {
  path: '/profile',
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
        return <p>Coming Soon</p>;
      },
    },
    {
      path: '/settings',
      action: async() => {
        return <p>Coming Soon</p>;
      }
    }
  ],
};
