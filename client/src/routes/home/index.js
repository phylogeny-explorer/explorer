import React from 'react';
import Home from './Home';
import Auth from '../../components/Auth'
import history from "../../core/history";

export default {

  path: '/',

  action: async() => {
    history.push('/clades');
    return '';
  },

};
