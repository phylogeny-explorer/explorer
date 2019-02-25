import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Checkbox,
  Button,
  ButtonToolbar,
} from 'react-bootstrap';
import s from './User.css';
import Request from '../../core/Request';
import history from '../../core/history';

let title = '';

class UserForm extends React.Component {

  static propTypes = {
    user: PropTypes.any,
    activeRoles: PropTypes.array,
    mode: PropTypes.string,
  };

  constructor(props, context) {
    super(props);

    if (context.setTitle) {
      title = `${this.props.mode} User`;
      context.setTitle(title);
    }

    if (this.props.mode !== 'Create') {
      this.state = {
        roleId: this.props.user.role._id,
        title: this.props.user.title,
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        username: this.props.user.username,
        address: this.props.user.address,
        postcode: this.props.user.postcode,
        phone: this.props.user.phone,
        email: this.props.user.email,
        dateOfBirth: this.props.user.dateOfBirth,
        gender: this.props.user.gender,
        coverLetter: this.props.user.coverLetter,
        subscribed: this.props.user.subscribed,
      };
    } else {
      this.state = {
        roleId: '',
        title: '',
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        address: '',
        postcode: '',
        phone: '',
        email: '',
        dateOfBirth: '',
        gender: '',
        coverLetter: '',
        subscribed: false,
      };
    }
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

  onCancel(e) {
    e.preventDefault();
    history.push('/users');
  }

  onSubmit(e) {
    e.preventDefault();
    (async() => {
      let resp = null;
      let key = '';
      switch (this.props.mode) {
        case 'Create':
          resp = await new Request('/users', 'POST', this.state).fetch();
          key = resp._id;
          break;
        case 'Update':
          resp = await new Request(`/users/${this.props.user._id}`, 'PUT', this.state).fetch();
          key = resp._id;
          break;
        case 'Destroy':
          resp = await new Request(`/users/${this.props.user._id}`, 'DELETE', this.state).fetch();
          key = resp.userId;
          break;
        default:
          break;
      }

      if (key !== '') {
        history.push('/users');
      }
    })();
  }

  getButtonStyle() {
    switch (this.props.mode) {
      case 'Destroy':
        return 'danger';
      case 'Update':
        return 'info';
      default:
        return 'success';
    }
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <form onSubmit={(e) => this.onSubmit(e)}>

            <FormGroup controlId="roleId">
              <ControlLabel>Role</ControlLabel>
              <FormControl
                componentClass="select"
                disabled={this.props.mode === 'Destroy'}
                value={this.state.roleId}
                onChange={(e) => this.onChange(e)}
                required
              >
                <option value=" ">Please select a role...</option>
                {this.props.activeRoles.map((ar, j) =>
                  <option key={j} value={ar._id}>
                    {ar.description} {ar.isDefault ? '(Default)' : null}
                  </option>
                )}
              </FormControl>
            </FormGroup>

            <FormGroup controlId="firstName">
              <ControlLabel>First Name</ControlLabel>
              <FormControl
                placeholder="First Name"
                type="text"
                value={this.state.firstName}
                onChange={(e) => this.onChange(e)}
                disabled={this.props.mode === 'Destroy'}
              />
            </FormGroup>

            <FormGroup controlId="lastName">
              <ControlLabel>Last Name</ControlLabel>
              <FormControl
                placeholder="Last Name"
                type="text"
                value={this.state.lastName}
                onChange={(e) => this.onChange(e)}
                disabled={this.props.mode === 'Destroy'}
              />
            </FormGroup>

            <FormGroup controlId="username">
              <ControlLabel>Username</ControlLabel>
              <FormControl
                placeholder="Username"
                type="text"
                value={this.state.username}
                onChange={(e) => this.onChange(e)}
                disabled={this.props.mode === 'Destroy'}
                required
              />
            </FormGroup>

            {(this.props.mode === 'Create') ? (
              <FormGroup controlId="password">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  placeholder="Password"
                  type="password"
                  value={this.state.password}
                  onChange={(e) => this.onChange(e)}
                  disabled={this.props.mode === 'Destroy'}
                  required
                  minLength="8"
                />
              </FormGroup>
            ) : ''}

            <FormGroup controlId="referenceCode">
              <ControlLabel>Reference Code</ControlLabel>
              <FormControl
                placeholder="Reference Code"
                type="text"
                value={this.state.referenceCode}
                onChange={(e) => this.onChange(e)}
                disabled={this.props.mode === 'Destroy'}
                required
              />
            </FormGroup>

            <FormGroup controlId="email">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                placeholder="Email"
                type="email"
                value={this.state.email}
                onChange={(e) => this.onChange(e)}
                disabled={this.props.mode === 'Destroy'}
                required
              />
            </FormGroup>

            <FormGroup controlId="subscribed">
              <ControlLabel>Subscription</ControlLabel>
              <Checkbox
                id="subscribed"
                onChange={(e) => this.onChange(e)}
                disabled={this.props.mode === 'Destroy'}
                value={this.state.subscribed}
                checked={this.state.subscribed}
              >
                Subscribed?
              </Checkbox>
            </FormGroup>

            <FormGroup controlId="coverLetter">
              <ControlLabel>Cover Letter</ControlLabel>
              <FormControl
                placeholder="Cover Letter"
                componentClass="textarea"
                rows="8"
                value={this.state.coverLetter}
                onChange={(e) => this.onChange(e)}
                disabled={this.props.mode === 'Destroy'}
              />
            </FormGroup>

            <ButtonToolbar>
              <Button id="submitButton" type="submit" bsStyle={this.getButtonStyle()}>
                {this.props.mode}
              </Button>
              <Button id="cancelButton" type="button" bsStyle="warning" onClick={(e) => this.onCancel(e)}>
                Cancel
              </Button>
            </ButtonToolbar>

          </form>
        </div>
      </div>
    );
  }
}

UserForm.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(UserForm);
