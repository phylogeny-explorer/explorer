/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author Emmanuel Proulx
 *
 * Copyright(c) 2018 Phylogeny Explorer
 */

import React from 'react';
import PasswordReset from './PasswordReset';

export default {

  path: '/passwordReset',

  action(context) {
    return <PasswordReset query={context.query} />;
  },

};
