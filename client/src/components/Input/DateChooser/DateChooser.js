import React, {Component} from 'react';
import PropTypes from "prop-types";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DateChooser.css';
import cx from 'classnames';
import DateUtils from "../../../utils/DateUtils";


class DateChooser extends Component {
  static propTypes = {
    //data
    value: PropTypes.object, //the value to be displayed. This will be a Date object.
    placeholder: PropTypes.string,

    //actions
    onChange: PropTypes.func, //Sends the Date object that the user chose. This might send null if the user cleared the input.

    //styling
    style: PropTypes.object,
    className: PropTypes.string,
  };


  //EVENT HANDLERS
  handleChange = e => {
    const dateString = e.target.value;
    if(this.props.onChange) {
      this.props.onChange(new Date(dateString));
    }
  };


  //RENDERING
  render() {
    return (
      <input
        style={this.props.style}
        className={cx(s.root, this.props.className)}
        value={DateUtils.toYYYYMMDD(this.props.value)}
        onChange={this.handleChange}
        type="date"/>
    );
  }
}

export default withStyles(s)(DateChooser);
