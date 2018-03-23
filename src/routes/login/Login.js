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
import s from './Login.css';
import Request from '../../core/Request';
import Auth from '../../components/Auth';
import history from '../../core/history';

const title = 'Log In';

class Login extends React.Component {
  constructor(props, context) {
    super(props);
    if (context.setTitle) {
      context.setTitle(title);
    }
    this.state = {
      username: '',
      password: '',
      errors: '',
      message: '',
    };
  }

  onSubmit(e) {
    e.preventDefault();
    (async() => {
      const resp = await new Request('/auth/login', 'POST', this.state).fetch();
      if (!resp.success) {
        this.setState({
          errors: resp.errors,
          message: resp.message,
          success: false,
        });
      } else {
        Auth.authenticateUser(resp.token, resp.user.role, resp.user.username);
        history.push('/');
      }
    })();
  }

  onChange(e) {
    const model = {};
    this.setState(model);
    if (e.target.type === 'checkbox') {
      model[e.target.id] = e.target.checked;
    } else {
      model[e.target.id] = e.target.value;
    }
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          {this.state.message}
          <hr />
          <form onSubmit={(e) => this.onSubmit(e)}>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="username">
                Username:
              </label>
              <input
                className={s.input}
                id="username"
                type="text"
                name="username"
                value={this.state.username}
                onChange={(e) => this.onChange(e)}
                autoFocus
              />
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="password">
                Password:
              </label>
              <input
                className={s.input}
                id="password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={(e) => this.onChange(e)}
              />
            </div>
            <div className={s.formGroup} >
              <button className={s.button} type="submit">
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Login.contextTypes = { setTitle: React.PropTypes.func.isRequired };

export default withStyles(s)(Login);
