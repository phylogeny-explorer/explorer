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
import s from './Home.css';
import Auth from "../../components/Auth";
import LoginForm from '../login/Form';
import RegisterForm from '../signup/Form';
import { Grid, Row, Col } from 'react-bootstrap';


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

Home.contextTypes = { setTitle: React.PropTypes.func.isRequired };

export default withStyles(s)(Home);
