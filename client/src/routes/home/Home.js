import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import Auth from "../../components/Auth";
import LoginForm from '../login/Form';
import RegisterForm from '../signup/Form';
import { Grid, Row, Col, Alert } from 'react-bootstrap';


class Home extends React.Component {
  constructor(props, context) {
    super(props);
    if (context.setTitle) {
      context.setTitle('Phylogeny Explorer Project');
    }
  }

  componentDidMount() {
    this.onAuthenticationStatusChange(Auth.isUserAuthenticated());
    Auth.addListener(this.onAuthenticationStatusChange.bind(this));
  }

  onAuthenticationStatusChange(status) {
    this.setState({
      isAuthenticated: status,
      role: Auth.getRole(),
      username: Auth.getUsername(),
    });
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Grid>
            <Row>
              <Alert className='alert-warning'>
                <p style={{fontWeight : 'bold'}}>
                  <span className="glyphicon glyphicon-info-sign" /> The Phylogeny Explorer is currently in Alpha.
                </p>
                <p>
                  Only a select group of people are allowed to access the Explorer at this time.
                  Please join the <a href="https://www.facebook.com/groups/1493690154202103">Facebook group</a> if you
                  would like to get involved with the project. Public access will be granted when the
                  Explorer reaches Beta. You may register, however access is only granted to those with a valid reference code
                  or prior permission from a project administrator. All registrations must be reviewed and approved by an admin
                  before access is granted.
                </p>
              </Alert>
            </Row>
            <Row>
              <Col sm={5}>
                <LoginForm/>
              </Col>
              <Col sm={1} className={s.middleCol}/>
              <Col sm={1}/>
              <Col sm={5}>
                <RegisterForm/>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

Home.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Home);
