import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Logout.css';
import Auth from '../../components/Auth';
import history from '../../core/history';
import Link from '../../components/Link';

const title = 'Log Out';

class Logout extends React.Component {
  componentDidMount() {
    Auth.deauthenticateUser();
    setTimeout(() => history.push('/'), 5000);
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <hr />
          <p>You have been logged out!</p>
          <p>You will be redirected in 5 seconds. <Link to="/">Click here to go back home</Link>.</p>
        </div>
      </div>
    );
  }
}

Logout.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Logout);
