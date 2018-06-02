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
import { FormGroup, FormControl, Alert, Button } from 'react-bootstrap';


class Form extends React.Component {
  constructor(props) {
    super(props);
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
        history.push('/clades');
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
      <form onSubmit={(e) => this.onSubmit(e)}>
        <div className={s.formTop}>
          <h1>Login to the Explorer</h1>
          <p>Enter username and password to log in:</p>
        </div>
        <div className={s.formBody}>
          {this.state.message && <Alert bsStyle="danger">{this.state.message}</Alert>}
          <FormGroup className={s.formGroup}>
            <FormControl
              className={s.input}
              placeholder="Username..."
              id="username"
              type="text"
              name="username"
              value={this.state.username}
              onChange={(e) => this.onChange(e)}
              autoFocus
            />
          </FormGroup>
          <FormGroup className={s.formGroup}>
            <FormControl
              className={s.input}
              placeholder="Password..."
              id="password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={(e) => this.onChange(e)}
            />
          </FormGroup>
          <Button className={s.loginButton} block type="submit">Log in!</Button>
        </div>
      </form>
    );
  }
}

export default withStyles(s)(Form);
