import React from 'react';
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from './Attribution.css';
import Attribution from './Attribution';
import {
  FormControl,
  FormGroup,
  ControlLabel,
} from 'react-bootstrap';

class EmendedAttribution extends React.Component
{
  updateEmendedOldName(emendedOldName)
  {
    this.props.onChange(Object.assign({}, this.props.attribution, {
      emendedOldName
    }));
  }

  render()
  {
    return (
      <Attribution
        attribution={this.props.attribution}
        onChange={this.props.onChange}
        onDelete={this.props.onDelete}
        extraField={
          <FormGroup controlId="name">
            <ControlLabel>Old Name</ControlLabel>
            <FormControl
              placeholder="Old Name"
              type="text"
              value={this.props.attribution.emendedOldName || ''}
              onChange={(e) => this.updateEmendedOldName(e.target.value)}
            />
          </FormGroup>
        }
      />
    );
  }
}

export default withStyles(s)(EmendedAttribution);