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
