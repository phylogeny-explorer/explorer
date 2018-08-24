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
import s from './Forgot.css';
import Request from '../../core/Request';
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
      const resp = await new Request('/auth/forgot', 'POST', this.state).fetch();
        this.setState({
          message: resp.message,
          success: false,
        });
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
          <p>Enter username or email address to send new credentials to the email account on file.</p>
        </div>
        <div className={s.formBody}>
          {this.state.message && <Alert bsStyle="danger">{this.state.message}</Alert>}
          <FormGroup className={s.formGroup}>
            <FormControl
              className={s.input}
              placeholder="Username or email address..."
              id="username"
              type="text"
              name="username"
              value={this.state.username}
              onChange={(e) => this.onChange(e)}
              autoFocus
            />
          </FormGroup>
          <Button className={s.loginButton} block type="submit">Request Credentials</Button>
        </div>
      </form>
    );
  }
}

export default withStyles(s)(Form);
