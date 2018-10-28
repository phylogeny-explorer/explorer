import React from 'react';
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from './Attribution.css';
import Attribution from './Attribution';

class VideAttribution extends React.Component
{
  render()
  {
    return (
      <Attribution
        attribution={this.props.attribution}
        onChange={this.props.onChange}
        onDelete={this.props.onDelete}
      />
    );
  }
}

export default withStyles(s)(VideAttribution);