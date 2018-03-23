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
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Logout.css';
import Auth from '../../components/Auth';

const title = 'LogOut';

class Logout extends React.Component {
  componentDidMount() {
    Auth.deauthenticateUser();
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>

          <hr />
          You have been logged out!
        </div>
      </div>
    );
  }
}

Logout.contextTypes = { setTitle: React.PropTypes.func.isRequired };

export default withStyles(s)(Logout);
