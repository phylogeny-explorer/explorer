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
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Checkbox,
  Button,
  ButtonToolbar,
  Panel,
} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Signup.css';
import Request from '../../core/Request';
import history from '../../core/history';


const title = 'Signup Form';

class Signup extends React.Component {
  constructor(props, context) {
    super(props);

    if (context.setTitle) {
      context.setTitle(title);
    }

    this.state = {
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
      dateOfBirthFormatted: '',
      gender: '',
      coverLetter: '',
      subscribed: false,
      errors: '',
      success: false,
      message: '',
      repeat_password: '',
    };
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

  onHandleDateOfBirthChange(value, formattedValue) {
    this.setState({
      dateOfBirth: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
      dateOfBirthFormatted: formattedValue, // Formatted String, ex: "11/19/2016"
    });
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
        const resp = await new Request('/auth/signup', 'POST', this.state).fetch();
        if (!resp.success) {
          this.setState({
            errors: resp.errors,
            message: resp.message,
            success: false,
          });
        } else {
          this.setState({
            errors: resp.errors,
            message: resp.message,
            success: true,
          });
        }
      }
    })();
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <hr />
          {(this.state.success) ? (
            <div>
              {this.state.message}
            </div>
          ) : (
            <form onSubmit={(e) => this.onSubmit(e)}>
              <FormGroup controlId="title">
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  placeholder="ex. 'Mr, Miss, Mrs'"
                  type="text"
                  value={this.state.title}
                  onChange={(e) => this.onChange(e)}
                />
              </FormGroup>

              <FormGroup controlId="firstName">
                <ControlLabel>First Name</ControlLabel>
                <FormControl
                  placeholder="ex. 'John'"
                  type="text"
                  value={this.state.firstName}
                  onChange={(e) => this.onChange(e)}
                />
              </FormGroup>

              <FormGroup controlId="lastName">
                <ControlLabel>Last Name</ControlLabel>
                <FormControl
                  placeholder="ex. 'Dough'"
                  type="text"
                  value={this.state.lastName}
                  onChange={(e) => this.onChange(e)}
                />
              </FormGroup>

              <FormGroup controlId="username">
                <ControlLabel>Username</ControlLabel>
                <FormControl
                  placeholder="ex. 'johndough'"
                  type="text"
                  value={this.state.username}
                  onChange={(e) => this.onChange(e)}
                  required
                />
              </FormGroup>

              <FormGroup controlId="password">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  placeholder="A strong password!"
                  type="password"
                  value={this.state.password}
                  onChange={(e) => this.onChange(e)}
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
                  minLength="8"
                  required
                />
              </FormGroup>

              <FormGroup controlId="address">
                <ControlLabel>Address</ControlLabel>
                <FormControl
                  placeholder="Complete address please, we will verify!"
                  type="text"
                  value={this.state.address}
                  onChange={(e) => this.onChange(e)}
                  required
                />
              </FormGroup>

              <FormGroup controlId="postcode">
                <ControlLabel>Postcode</ControlLabel>
                <FormControl
                  placeholder="ex. '10067'"
                  type="text"
                  value={this.state.postcode}
                  onChange={(e) => this.onChange(e)}
                  required
                />
              </FormGroup>

              <FormGroup controlId="phone">
                <ControlLabel>Phone</ControlLabel>
                <FormControl
                  placeholder="Phone"
                  type="text"
                  value={this.state.phone}
                  onChange={(e) => this.onChange(e)}
                />
              </FormGroup>

              <FormGroup controlId="email">
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  placeholder="ex. 'john@dough.com'"
                  type="email"
                  value={this.state.email}
                  onChange={(e) => this.onChange(e)}
                  required
                />
              </FormGroup>

              <FormGroup controlId="dateOfBirth">
                <ControlLabel>Date of Birth</ControlLabel>
                <DatePicker
                  value={this.state.dateOfBirth}
                  onChange={(v, f) => this.onHandleDateOfBirthChange(v, f)}
                />
              </FormGroup>

              <FormGroup controlId="gender">
                <ControlLabel>Gender</ControlLabel>
                <FormControl
                  componentClass="select"
                  value={this.state.gender}
                  onChange={(e) => this.onChange(e)}
                  required
                >
                  <option value="">Please select a gender...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </FormControl>
              </FormGroup>

              <FormGroup controlId="subscribed">
                <ControlLabel>Subscribe to Newsletter</ControlLabel>
                <Checkbox
                  id="subscribed"
                  onChange={(e) => this.onChange(e)}
                  value={this.state.subscribed}
                  checked={this.state.subscribed}
                >
                  Yes
                </Checkbox>
              </FormGroup>

              <FormGroup controlId="coverLetter">
                <ControlLabel>Cover Letter</ControlLabel>
                <FormControl
                  placeholder="Short story of who you are and why you want to join our community."
                  componentClass="textarea"
                  rows="8"
                  value={this.state.coverLetter}
                  onChange={(e) => this.onChange(e)}
                />
              </FormGroup>

              {(this.state.errors !== '') ? (
                <Panel header="Form Errors" bsStyle="danger">
                  {this.state.message}
                  <ul>
                    {Object.keys(this.state.errors).map((error, j) =>
                      <li key={j}>
                        {error} - {this.state.errors[error]}
                      </li>
                    )}
                  </ul>
                </Panel>
              ) : ''}
              <ButtonToolbar>
                <Button type="submit" bsStyle="success">
                  Sign Up
                </Button>
              </ButtonToolbar>

            </form>
          )}
        </div>
      </div>
    );
  }
}

Signup.contextTypes = { setTitle: React.PropTypes.func.isRequired };

export default withStyles(s)(Signup);
