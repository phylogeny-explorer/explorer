import React from 'react';
import PropTypes from 'prop-types';


var ZyngaScroller = require('./ZyngaScroller.jsx');
var TouchableArea = require('./TouchableArea.jsx');

var cloneWithProps = require('react/lib/cloneWithProps');

function isTouchDevice() {
  return 'ontouchstart' in document.documentElement // works on most browsers
    || 'onmsgesturechange' in window; // works on ie10
};

var ScrollArea = React.createClass({

  componentWillMount : function() {
    this.scroller = new ZyngaScroller(isTouchDevice() ? this._handleScroll : this._doNothing);
  },

  render : function() {
    if (!isTouchDevice()) {
      return this.props.children;
    }

    return (
      <TouchableArea scroller={this.scroller}>
        {this.props.children}
      </TouchableArea>
    );
  },

  onContentDimensionsChange : function(tableWidth, tableHeight, contentWidth, contentHeight) {
    this.scroller.setDimensions(
      tableWidth,
      tableHeight,
      contentWidth,
      contentHeight
    );
  },

  _handleScroll : function(left, top) {
    this.props.handleScroll(left, top);
  },

  _doNothing : function(left, top) {

  }
});

module.exports = ScrollArea;
