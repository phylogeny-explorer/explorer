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
import s from './PasswordReset.css';
import Request from '../../core/Request';
import Auth from '../../components/Auth';
import history from '../../core/history';
import PasswordResetForm from './Form';
import { Grid, Row, Col } from 'react-bootstrap';

const title = 'Password Reset';

class PasswordReset extends React.Component {
  constructor(props, context) {
    super(props);
    if (context.setTitle) {
      context.setTitle(title);
    }
    this.state = {
	  username: props.query.username,
	  resetCode: props.query.resetCode,
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
	          <PasswordResetForm username={this.state.username} resetCode={this.state.resetCode} />
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

PasswordReset.contextTypes = { setTitle: React.PropTypes.func.isRequired };

export default withStyles(s)(PasswordReset);
