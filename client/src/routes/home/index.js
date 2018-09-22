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
import history from "../../core/history";

export default {

  path: '/',

  action: async() => {
    if (Auth.isUserAuthenticated()) {
      history.push('/clades');
      return '';
    }

    return <Home />;
  },

};
