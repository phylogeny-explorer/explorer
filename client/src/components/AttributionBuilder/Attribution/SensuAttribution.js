import React from 'react';
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from './Attribution.css';
import Attribution from './Attribution';
import {SensuLabel} from "common/databases/public/constants";
import {
  FormControl,
  FormGroup,
  ControlLabel,
} from 'react-bootstrap';

class SensuAttribution extends React.Component
{
  componentWillMount()
  {
    this.updateSensuLabel(this.props.attribution.sensuLabel || Object.keys(SensuLabel)[0]);
  }

  updateSensuLabel(sensuLabel)
  {
    this.props.onChange(Object.assign({}, this.props.attribution, {
      sensuLabel
    }));
  }

  updateSensuClade(sensuClade)
  {
    this.props.onChange(Object.assign({}, this.props.attribution, {
      sensuClade
    }));
  }

  render()
  {
    return (
      <Attribution
        attribution={this.props.attribution}
        onChange={this.props.onChange}
        onDelete={this.props.onDelete}
        extraLabel={
          <FormControl componentClass="select" onChange={(e) => this.updateSensuLabel(e.target.value)} value={this.props.attribution.sensuLabel}>
            {Object.keys(SensuLabel).map(key => (
              <option key={key} value={key}>{SensuLabel[key]}</option>
            ))}
          </FormControl>
        }
        extraField={
          <FormGroup controlId="name">
            <ControlLabel>Clade</ControlLabel>
            <FormControl
              placeholder="Clade"
              type="text"
              value={this.props.attribution.sensuClade || ''}
              onChange={(e) => this.updateSensuClade(e.target.value)}
            />
          </FormGroup>
        }
      />
    );
  }
}

export default withStyles(s)(SensuAttribution);