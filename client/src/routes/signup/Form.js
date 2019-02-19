import React from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Checkbox,
  Button,
  Panel,
  HelpBlock,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Signup.css';
import Request from '../../core/Request';

class Signup extends React.Component {
  constructor(props, context) {
    super(props);

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
      subscribed: true,
      errors: '',
      success: false,
      message: '',
      repeat_password: '',
      referenceCode: '',
    };

    this.continueRegistration = this.continueRegistration.bind(this);
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

  onSubmit(e) {
    e.preventDefault();
    (async() => {
      if (this.state.repeat_password !== this.state.password) {
        return this.setState({
          errors: { password: 'Passwords do not match' },
          message: 'Passwords do not match',
          success: false,
        });
      }

      const resp = await new Request('/auth/signup', 'POST', this.state).fetch();
      if (!resp.success) {
        return this.setState({
          errors: resp.errors,
          message: resp.message,
          success: false,
        });
      }

      return this.setState({
        errors: resp.errors,
        message: resp.message,
        success: true,
      });
    })();
  }

  continueRegistration() {
    this.setState({showSection2: true});
  }

  render() {
    return (
      <div>
        <div className={s.formTop}>
          <h1>Register</h1>
          {
            !this.state.success &&
            <div>
              <p>You must register to use the Phylogeny Explorer.</p>
            </div>
          }
        </div>
        <div className={s.formBody}>
        { this.state.success ? <div>{this.state.message}</div> : (
          <form onSubmit={(e) => this.onSubmit(e)}>
            <FormGroup controlId="username">
              <ControlLabel>Username</ControlLabel>
              <FormControl
                placeholder="ex. 'johndough'"
                type="text"
                value={this.state.username}
                onChange={(e) => this.onChange(e)}
                className={s.input}
                required
              />
            </FormGroup>

            <FormGroup controlId="email">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                placeholder="ex. 'john@dough.com'"
                type="email"
                value={this.state.email}
                onChange={(e) => this.onChange(e)}
                className={s.input}
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
            {
              !this.state.showSection2 &&
              <Button id="continueButton" className={s.loginButton} onClick={this.continueRegistration} bsSize="large" block>Continue &gt;</Button>
            }

            {
              this.state.showSection2 &&
              <div>
                <FormGroup controlId="firstName">
                  <ControlLabel>First Name</ControlLabel>
                  <FormControl
                    placeholder="ex. 'John'"
                    type="text"
                    value={this.state.firstName}
                    onChange={(e) => this.onChange(e)}
                    className={s.input}
                  />
                </FormGroup>

                <FormGroup controlId="lastName">
                  <ControlLabel>Last Name</ControlLabel>
                  <FormControl
                    placeholder="ex. 'Dough'"
                    type="text"
                    value={this.state.lastName}
                    onChange={(e) => this.onChange(e)}
                    className={s.input}
                  />
                </FormGroup>

                <FormGroup controlId="referenceCode">
                  <ControlLabel>Reference Code</ControlLabel>
                  <FormControl
                    placeholder=""
                    type="text"
                    value={this.state.referenceCode}
                    onChange={(e) => this.onChange(e)}
                    className={s.input}
                  />
                  <HelpBlock className={s.helpBlock}>
                    <span className="glyphicon glyphicon-triangle-top" /> TetZooCon or other Reference Code
                  </HelpBlock>
                </FormGroup>

                <FormGroup controlId="coverLetter">
                  <ControlLabel>Cover Letter</ControlLabel>
                  <FormControl
                    placeholder="Short story of who you are and why you want to join our community."
                    componentClass="textarea"
                    rows="8"
                    value={this.state.coverLetter}
                    onChange={(e) => this.onChange(e)}
                    className={`${s.input} ${s.textarea}`}
                  />
                </FormGroup>

                <FormGroup controlId="subscribed">
                  <Checkbox
                    id="subscribed"
                    onChange={(e) => this.onChange(e)}
                    value={this.state.subscribed}
                    checked={this.state.subscribed}
                  >
                    Subscribe to Newsletter
                  </Checkbox>
                </FormGroup>

                {(this.state.errors && this.state.errors !== '') ? (
                  <Panel header="Form Errors" bsStyle="danger">
                    <ul>
                      {Object.keys(this.state.errors).map((error, j) =>
                        <li key={j}>
                          {error} - {this.state.errors[error]}
                        </li>
                      )}
                    </ul>
                  </Panel>
                ) : ''}

                <Button id="registerButton" className={s.loginButton}_register type="submit" bsSize="large" block>Register</Button>
              </div>
            }
          </form>
        )}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Signup);
