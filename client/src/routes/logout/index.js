import React from 'react';
import Logout from './Logout';

export default {
  path: '/auth/logout',
  action() {
    return <Logout />;
  },
};

