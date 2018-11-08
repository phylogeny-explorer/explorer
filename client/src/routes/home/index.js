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
