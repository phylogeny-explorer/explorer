import React from 'react';
import FixedDataTable from 'fixed-data-table';
import SetContainerSize from './SetContainerSize';
import TouchScrollArea  from './TouchScrollArea';

const Table = FixedDataTable.Table;
const Column = FixedDataTable.Column;
const PropTypes = React.PropTypes;

class FittedTable extends React.Component {

  onContentHeightChange(contentHeight) {
    let width = 0;
    React.Children.forEach(this.props.children, (child) => {
      if ('width' in child.props) {
        width += child.props.width;
      }
    });

    this.refs.touchScrollArea.onContentDimensionsChange(this.state.width, this.state.height, width, contentHeight);
  }


  handleScroll(left, top) {
    this.setState({ top, left });
  }

  render() {
    const controlledScrolling = this.state.left !== undefined || this.state.top !== undefined;
    return (
      <SetContainerSize>
        <TouchScrollArea handleScroll={this.handleScroll} ref='touchScrollArea'>
          <Table
            {...this.props}
            width={this.state.width}
            height={this.state.height}
            onContentHeightChange={this.onContentHeightChange}
            scrollTop={this.state.top}
            scrollLeft={this.state.left}
            overflowX={controlledScrolling ? "hidden" : "auto"}
            overflowY={controlledScrolling ? "hidden" : "auto"}
          />
        </TouchScrollArea>
      </SetContainerSize>
    );
  }
}


module.exports = FittedTable;
