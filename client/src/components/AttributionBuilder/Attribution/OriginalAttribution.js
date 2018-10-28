import React from 'react';
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from './Attribution.css';
import Attribution from './Attribution';
import {
  Checkbox,
} from 'react-bootstrap';

class OriginalAttribution extends React.Component
{
  componentWillMount()
  {
    this.onImpliedChanged(false);
  }

  onImpliedChanged(isImplied)
  {
    this.props.onChange(Object.assign({}, this.props.attribution, {
      isImplied
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
          <Checkbox
              className={s.impliedbox}
              checked={this.props.attribution.isImplied || false}
              onChange={(e) => this.onImpliedChanged(e.target.checked)}>
            Implied
          </Checkbox>
        }
      />
    );
  }
}

export default withStyles(s)(OriginalAttribution);