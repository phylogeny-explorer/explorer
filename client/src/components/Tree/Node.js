import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Citation as AttributionsCitation } from '../Citation';
import s from '../../components/Cladogram/Cladogram.css';

class Node extends React.Component {

  static propTypes = {
    id: PropTypes.any.isRequired,
    name: PropTypes.any,
    otherNames: PropTypes.any,
    description: PropTypes.any,
    attributions: PropTypes.array,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    hasChildren: PropTypes.bool.isRequired,
    onSelect: PropTypes.any,
    nodePopoverComponent: PropTypes.any,
    parentX: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      dragging: props.dragging
    };
  }

  onClick() {
    if (this.state.dragging) return;
    this.props.onSelect({
      id: this.props.id,
      name: this.props.name,
    });
  }

  getLabeYPos() {
    let pos = 4;

    if (this.props.hasChildren) {
      // If parent is higher than node, place label underneath node
      pos = (this.props.parentX < this.props.x) ? 12 : -5;
    }

    return pos;
  }

  render() {
    const tooltip = (
      <Tooltip id="tooltip">
        <AttributionsCitation attributions={this.props.attributions} />
      </Tooltip>
    );

    const PopOver = this.props.nodePopoverComponent;

    let result = (<g
        className={`${s.node} ${this.props.hasChildren ? s.node_internal : s.node_internal}`}
        transform={`translate(${this.props.y}, ${this.props.x})`}
      >
        <circle r="3" />
        <text
          id={this.props.id}
          onClick={(e) => this.onClick(e)}
          dx={this.props.hasChildren ? -2 : 32}
          dy={this.getLabeYPos()}
          textAnchor={this.props.hasChildren ? 'end' : 'start'}
        >
          {this.props.extinct && "†"}
          {this.props.name || '[UNNAMED]'}
        </text>
        { this.props.name === 'Biota' ? '' :
          <PopOver
            id={this.props.id}
            name={this.props.name}
            hasChildren={this.props.hasChildren}
            description={this.props.description}
            attributions={this.props.attributions}
            otherNames={this.props.otherNames}
          />
        }
      </g>);

    if (this.props.attributions && this.props.attributions.length>0 ) {
      result = <OverlayTrigger overlay={tooltip}>{result}</OverlayTrigger>;
    }

    return result;
  }
}

export default withStyles(s)(Node);
