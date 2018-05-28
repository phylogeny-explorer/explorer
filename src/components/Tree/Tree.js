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
import * as d3 from 'd3';
import Node from './Node';
import Edge from './Edge';

const NODE_WIDTH = 300;
const NODE_HEIGHT = 24;

class Tree extends React.Component {

  static propTypes = {
    root: PropTypes.any.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onSelectNode: PropTypes.any,
    popoverComponent: PropTypes.any,
    depth: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.draw(props);
    this.onWheel = this.onWheel.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.zoom = this.zoom.bind(this);
  }

  componentWillReceiveProps(props) {
    this.draw(props);
  }

  draw(props) {
    const tree = d3.tree().nodeSize([NODE_HEIGHT, NODE_WIDTH]);
    const root = d3.hierarchy(props.root);
    const compiledTree = tree(root);
    this.state = {
      tree: compiledTree,
      width: props.width,
      height: props.height,
      matrix: [1, 0, 0, 1, 0, 0],
      dragging: false,
    };

    const left = (NODE_WIDTH*props.depth > props.width) ? 150 : ((props.width/2) - (NODE_WIDTH*props.depth/2));
    this.pan(left, props.height/2);
  }

  drawEdges() {
    const edges = this.state.tree.descendants().map((edge, index) => {
      if (edge.parent) {
        return (<Edge datum={edge} key={index} />);
      }
      return null;
    });

    return (<g>{edges}</g>);
  }

  drawNodes() {
    return this.state.tree.descendants().map((node, index) =>
      (
        <Node
          key={index}
          k={index}
          hasChildren={node.children ? true : false}
          name={node.data.name}
          id={node.data._id}
          description={node.data.description}
          x={node.x}
          y={node.y}
          onSelect={(e) => this.props.onSelectNode(e)}
          nodePopoverComponent={this.props.popoverComponent}
          dragging={this.state.dragging}
        />
      )
    );
  }

  pan(dx, dy) {
    const matrix = this.state.matrix;
    matrix[4] += dx;
    matrix[5] += dy;
    this.setState({ matrix });
  }

  zoom(scale) {
    const matrix = this.state.matrix;
    const len = matrix.length;
    for (let i = 0; i < len; i++) {
      matrix[i] *= scale;
    }
    matrix[4] += (1 - scale) * this.props.width / 2;
    matrix[5] += (1 - scale) * this.props.height / 2;
    this.setState({ matrix });
  }

  onWheel(e) {
    if (e.deltaY < 0) {
      this.zoom(1.05);
    } else {
      this.zoom(0.95);
    }
  }

  onDragStart(e) {
    // Find start position of drag based on touch/mouse coordinates.
    const startX = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX;
    const startY = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;

    // Update state with above coordinates, and set dragging to true.
    const state = {
      dragging: true,
      startX,
      startY,
    };

    this.setState(state);
  }

  onDragMove(e) {
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;

    // First check if the state is dragging, if not we can just return
    // so we do not move unless the user wants to move
    if (!this.state.dragging) {
      return;
    }

    // Get the new x and y coordinates
    const x = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX;
    const y = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;

    // Take the delta where we are minus where we came from.
    const dx = x - this.state.startX;
    const dy = y - this.state.startY;

    // Pan using the deltas
    this.pan(dx, dy);

    // Update the new startX and startY position
    // because a drag is likely a continuous movement
    this.setState({
      startX: x,
      startY: y,
    });
  }

  onDragEnd() {
    this.setState({ dragging: false });
  }

  render() {
    return (
      <svg width={this.state.width} height={this.state.height}
           onMouseDown={(event) => this.onDragStart(event)}
           onTouchStart={(event) => this.onDragStart(event)}
           onMouseMove={(event) => this.onDragMove(event)}
           onTouchMove={(event) => this.onDragMove(event)}
           onMouseUp={(event) => this.onDragEnd(event)}
           onTouchEnd={(event) => this.onDragEnd(event)}
           onWheel={(event) => this.onWheel(event)}
           className={this.state.dragging ? 'moving': ''}
      >
        <g transform={`matrix(${this.state.matrix.join(' ')})`}>
          {this.drawEdges()}
          {this.drawNodes()}
        </g>
      </svg>
    );
  }

}

export default Tree;
