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
          {Auth.isUserAuthenticated()
            ?
            <Grid>
              <Row>
                <Col sm={12}>
                  <h1>Welcome!</h1>
                </Col>
              </Row>
            </Grid>
            :
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
          }
        </div>
      </div>
    );
  }
}


export default withStyles(s)(Home);
