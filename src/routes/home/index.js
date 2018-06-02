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
import Home from './Home';
import Auth from '../../components/Auth'
// import fetch from '../../core/fetch';

export default {

  path: '/',

  async action() {
    return <Home />;
  },

};
