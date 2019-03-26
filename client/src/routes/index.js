import React from 'react';
import App from '../components/App';

// Child routes
import home from './home';
import profile from './profile';
import rule from './rule';
import role from './role';
import root from './root';
import user from './user';
import clade from './clade';
import login from './login';
import forgot from './forgot';
import passwordReset from './password-reset';
import logout from './logout';
import signup from './signup';
import content from './content';
import error from './error';
import transaction from './transaction';

export default {

  path: '/',

  // keep in mind, routes are evaluated in order
  children: [
    clade,
    login,
    forgot,
    passwordReset,
    signup,
    logout,
    rule,
    role,
    user,
    transaction,
    home,
    root,
    profile,
    // place new routes before...
    content,
    error,
  ],

  async action({ next, render, context }) {
    const component = await next();
    if (typeof(component) === "undefined") return component;
    return render(
      <App context={context}>
        {component}
      </App>
    );
  },

};
