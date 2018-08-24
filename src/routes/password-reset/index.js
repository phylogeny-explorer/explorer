/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author Emmanuel Proulx
 *
 * Copyright(c) 2018 Phylogeny Explorer
 */

import React from 'react';
import PasswordReset from './password-reset';

export default {

  path: '/password-reset',

  action(context) {
    return <PasswordReset query={context.query} />;
  },

};
