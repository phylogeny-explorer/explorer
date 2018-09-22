import React from 'react';
import Profile from '../components/User/Profile';
import Settings from '../components/User/Settings';

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
        return <Profile />;
      },
    },
    {
      path: '/settings',
      action: async() => {
        return <Settings />;
      }
    }
  ],
};
