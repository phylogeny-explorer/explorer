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

class Tree extends React.Component {

  static propTypes = {
    root: PropTypes.any.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onSelectNode: PropTypes.any,
    popoverComponent: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.draw(props);
  }

  componentWillReceiveProps(props) {
    this.draw(props);
  }

  draw(props) {
    const tree = d3.cluster().size([props.height, props.width - 300]);
    const root = d3.hierarchy(props.root);
    const compiledTree = tree(root);
    this.state = {
      tree: compiledTree,
      width: props.width,
      height: props.height,
    };
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
        />
      )
    );
  }

  render() {
    return (
      <svg width={this.state.width} height={this.state.height}>
        <g transform={'translate(80,10)'}>
          {this.drawNodes()}
          {this.drawEdges()}
        </g>
      </svg>
    );
  }

}

export default Tree;
