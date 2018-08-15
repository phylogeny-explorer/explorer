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
import s from './Forgot.css';
import Request from '../../core/Request';
import Auth from '../../components/Auth';
import history from '../../core/history';
import ForgotForm from './Form';
import { Grid, Row, Col } from 'react-bootstrap';

const title = 'Forgot Password';

class Forgot extends React.Component {
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

  render() {
    return (
	  <div className={s.root}>
	    <div className={s.container}>
	      <h1>{title}</h1>
	      {this.state.message}
	      <hr />
	      <Grid>
	        <Row>
	          <Col sm={5}>
	          <ForgotForm />
	          </Col>
	          <Col sm={1} className={s.middleCol}/>
	          <Col sm={1}/>
	          <Col sm={5}>
	          </Col>
	        </Row>
	      </Grid>
	    </div>
	  </div>
    );
  }
}

Forgot.contextTypes = { setTitle: React.PropTypes.func.isRequired };

export default withStyles(s)(Forgot);
