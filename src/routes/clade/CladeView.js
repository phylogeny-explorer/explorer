/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 14/11/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  ButtonToolbar,
  Image,
} from 'react-bootstrap';
import s from './Clade.css';
import history from '../../core/history';

let title = '';

class CladeView extends React.Component {

  static propTypes = {
    clade: React.PropTypes.any,
  };

  constructor(props, context) {
    super(props);
    if (context.setTitle) {
      title = `Info: '${this.props.clade.name}'`;
      context.setTitle(title);
    }
  }

  onBack(e) {
    e.preventDefault();
    history.goBack();
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <hr />
          <form>
            <FormGroup>
              <ControlLabel>Clade Parent</ControlLabel>
              <FormControl.Static>
                {this.props.clade.parent.name || '[UNNAMED]'}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a href={`https://en.wikipedia.org/wiki/${this.props.clade.name}`}>Lookup In Wikipedia...</a>
              </FormControl.Static>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Clade Name</ControlLabel>
              <FormControl.Static>
                {this.props.clade.name}
              </FormControl.Static>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Clade Images</ControlLabel>
              <FormControl.Static>
                {this.props.clade.assets.map((asset, j) =>
                  <div key={j} className={s.thumbnail}>
                    <Image
                      src={`https://phylex-public.s3.amazonaws.com/clades/${this.props.clade._id}/${asset.name}`}
                      thumbnail
                    />
                  </div>
                )}
              </FormControl.Static>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Clade Description</ControlLabel>
              <FormControl.Static>
                <div dangerouslySetInnerHTML={{ __html: this.props.clade.description }} />
              </FormControl.Static>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Clade Alternative Names</ControlLabel>
              <FormControl.Static>
                {this.props.clade.otherNames}
              </FormControl.Static>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Clade Current State</ControlLabel>
              <FormControl.Static>
                {this.props.clade.extant ? 'Extant' : 'Extinct'}
              </FormControl.Static>
            </FormGroup>
            <ButtonToolbar>
              <Button type="button" bsStyle="info" onClick={(e) => this.onBack(e)}>
                Return To Tree
              </Button>
            </ButtonToolbar>
          </form>
        </div>
      </div>
    );
  }
}

CladeView.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(CladeView);
