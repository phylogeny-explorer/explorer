/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 25/10/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../../routes/clade/Clade.css';

class Edge extends React.Component {

  static propTypes = {
    datum: PropTypes.any.isRequired,
  };

  onSelect() {
    console.error(this.href);
  }

  drawPath(node) {
    return "M" + node.parent.y + "," + node.parent.x
      + "C" + (node.parent.y + node.y) / 2 + "," + node.parent.x
      + " " + (node.parent.y + node.y) / 2 + "," + node.x
      + " " + node.y + "," + node.x;
  }

  getDasharray() {
    return this.props.datum.certainty > 0 ? '5, 5' : '0';
  }

  render() {
    return (
      <path
        className={s.edge}
        d={this.drawPath(this.props.datum)}
        strokeDasharray={this.getDasharray()}
      />
    );
  }

}

export default withStyles(s)(Edge);
