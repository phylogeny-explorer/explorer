import React from 'react';
import history from "../../core/history";

export default {

  path: '/',
  action: async() => {
    history.push('/clades');
    return '';
  },
};
