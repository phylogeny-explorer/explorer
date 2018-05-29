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
  }

  componentWillReceiveProps(props) {
    this.needsInitPan = true;
    this.draw(props);
  }

  componentDidUpdate() {
    if (this.needsInitPan) this.doInitialPan();
  }

  draw(props) {
    const tree = d3.tree().nodeSize([NODE_HEIGHT, NODE_WIDTH]);
    const root = d3.hierarchy(props.root);
    const compiledTree = tree(root);
    this.state = {
      tree: compiledTree,
      width: props.width,
      height: props.height,
      depth: props.depth,
      matrix: props.matrix,
      dragging: false,
    };
  }

  // Center the cladogram or align root node for best initial view.
  doInitialPan() {
    this.needsInitPan = false;
    this.setState({ matrix: [1, 0, 0, 1, 0, 0]});

    const cladogram = document.getElementById('cladogram');
    const height = cladogram.getBBox().height;
    const width = cladogram.getBBox().width;

    const clientHeight = window.innerHeight - 52;

    // Get the x coord of the top of the tree
    let treeTopX = 0;
    this.state.tree.descendants().forEach(node => { treeTopX = Math.min(treeTopX, node.x) });

    // Center the tree horizontally if possible, otherwise position root node 150px from left side
    const left = (width > window.innerWidth) ? 150 : ((window.innerWidth/2) - (width/2));

    // Center the root node vertically
    let top = clientHeight/2;

    // If cladogram fits in screen, center the whole tree vertically
    if (height < clientHeight) {
      top = Math.abs(treeTopX) + (clientHeight/2) - (height/2);
    }

    this.pan(left, top);
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
          hasChildren={!!node.children}
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

  onWheel(e) {
    let scale = (e.deltaY < 0) ? 1.2 : 0.8;

    const x = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX;
    const y = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;

    const matrix = this.state.matrix;
    const len = matrix.length;

    for (let i = 0; i < len; i++) {
      matrix[i] *= scale;
    }

    matrix[4] += (1 - scale) * x;
    matrix[5] += (1 - scale) * y;

    this.setState({ matrix });
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

    // First check if the state is dragging, if not we can just return
    // so we do not move unless the user wants to move
    if (!this.state.dragging) return;

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
           id="cladogram_svg"
      >
        <g transform={`matrix(${this.state.matrix.join(' ')})`} id="cladogram">
          {this.drawEdges()}
          {this.drawNodes()}
        </g>
      </svg>
    );
  }

}

export default Tree;
