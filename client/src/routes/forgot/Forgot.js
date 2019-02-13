/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author Emmanuel Proulx
 *
 * Copyright(c) 2018 Phylogeny Explorer
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Forgot.css';
import ForgotForm from './Form';
import { Grid, Row, Col } from 'react-bootstrap';

const title = 'Forgot Password';

class Forgot extends React.Component {
  constructor(props, context) {
    super(props);
    if (context.setTitle) {
      context.setTitle(title);
    }
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Grid>
            <Row>
              <Col sm={6} smOffset={3}>
                <ForgotForm />
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

Forgot.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Forgot);
