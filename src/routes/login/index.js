/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 02/10/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import React from 'react';
import Login from './Login';

export default {

  path: '/auth/login',

  action() {
    return <Login />;
  },

};
