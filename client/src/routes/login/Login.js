import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.css';
import Request from '../../core/Request';
import Auth from '../../components/Auth';
import history from '../../core/history';
import LoginForm from './Form';

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
          <LoginForm />
        </div>
      </div>
    );
  }
}

Login.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Login);
