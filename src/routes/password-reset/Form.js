/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author Emmanuel Proulx
 *
 * Copyright(c) 2018 Phylogeny Explorer
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './password-reset.css';
import Request from '../../core/Request';
import history from '../../core/history';
import { FormGroup, FormControl, Alert, Button, ControlLabel } from 'react-bootstrap';

class Form extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      username: props.username,
      resetCode: props.resetCode,
      password: '',
      repeat_password: '',
      errors: '',
      message: '',
    };
  }

  onSubmit(e) {
    e.preventDefault();
    (async() => {
      if (this.state.repeat_password !== this.state.password) {
        this.setState({
          errors: { password: 'Passwords do not match' },
          message: 'Passwords do not match',
          success: false,
        });
      } else {
        const resp = await new Request('/auth/password-reset', 'POST', this.state).fetch();
        if (!resp.success) {
          console.error("/auth/password-reset returned error: ", resp.errors);
          this.setState({
            errors: resp.errors,
            message: resp.message,
            success: false,
          });
        } else {
          history.push('/');
        }
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
          <p>Your username is '{this.state.username}'.</p>
          <p>Enter a new password. It must be at least 8 characters long.</p>
        </div>
        <div className={s.formBody}>
          {this.state.message && <Alert bsStyle="danger">{this.state.message}</Alert>}
          <input type="hidden" name="resetCode" value={this.state.resetCode} />
          <input type="hidden" name="username" value={this.state.username} />
          <FormGroup controlId="password">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              placeholder="A strong password!"
              type="password"
              value={this.state.password}
              onChange={(e) => this.onChange(e)}
              className={s.input}
              minLength="8"
              required
            />
          </FormGroup>

          <FormGroup controlId="repeat_password">
            <ControlLabel>Repeat Password</ControlLabel>
            <FormControl
              placeholder="Please repeat for safety"
              type="password"
              value={this.state.repeat_password}
              onChange={(e) => this.onChange(e)}
              className={s.input}
              minLength="8"
              required
            />
          </FormGroup>
          <Button className={s.loginButton} block type="submit">Save Password</Button>
        </div>
      </form>
    );
  }
}

export default withStyles(s)(Form);
