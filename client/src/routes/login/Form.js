import React from 'react';
import Link from '../../components/Link';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.css';
import Request from '../../core/Request';
import Auth from '../../components/Auth';
import history from '../../core/history';
import { FormGroup, FormControl, Alert, Button, Panel, ControlLabel } from 'react-bootstrap';


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

  onChange({target}) {
    this.setState({ [target.id] : target.value });
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
            <ControlLabel>Username:</ControlLabel>
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
            <ControlLabel>Password:</ControlLabel>
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
          {
            (this.state.errors && this.state.errors !== '') &&
            <Panel header="Form Errors" bsStyle="danger">
              <ul>
                {Object.keys(this.state.errors).map((error, j) =>
                  <li key={j}>
                    {error} - {this.state.errors[error]}
                  </li>
                )}
              </ul>
            </Panel>
          }
          <Button className={s.loginButton} block type="submit">Log in!</Button>
          <p className={s.forgotPasswordLink}><Link to={`/forgot`}>Forgot your password? Click here.</Link></p>
        </div>
      </form>
    );
  }
}

export default withStyles(s)(Form);
