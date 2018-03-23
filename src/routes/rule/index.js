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
import RuleList from './RuleList';
import Request from '../../core/Request';

export default {

  path: '/rules',

  async action() {
    const rules = await new Request('/rules', 'GET').fetch();

    return <RuleList rules={rules} />;
  },

};
