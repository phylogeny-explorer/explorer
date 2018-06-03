import React, { PropTypes } from 'react';
import { OverlayTrigger, Button, Popover, ButtonToolbar, Glyphicon } from 'react-bootstrap';
import Link from '../../components/Link';
import history from '../../core/history';
import s from './Cladogram.css';

export default class Pane extends React.Component {

  static propTypes = {
    id: PropTypes.any.isRequired,
    name: PropTypes.any,
    description: PropTypes.any,
    hasChildren: PropTypes.any,
  };

  onCreate() {
    history.push(`/clades/evolve/${this.props.id}`);
  }

  onUpdate() {
    history.push(`/clades/update/${this.props.id}`);
  }

  onDestroy() {
    history.push(`/clades/destroy/${this.props.id}`);
  }


  render() {
    const coords = {
      x: 5,
      y: -12
    };

    let description = this.props.description || (<i>No description available</i>);

    if (description.length > 100) {
      description = `${description.substring(0, 100)}...`;
    }

    const actualWindow = (
      <Popover id="information-panel" title={`Clade: ${this.props.name || '[UNNAMED]'}`}>
        {description} <br /><br />
        <Link to={`/clades/info/${this.props.id}`}>Click here for more...</Link>
        <hr />
        <ButtonToolbar>
          <Button bsStyle="primary" bsSize="xsmall" onClick={(e) => this.onCreate(e)}>
            <Glyphicon glyph="random" /> Evolve
          </Button>
          <Button bsStyle="info" bsSize="xsmall" onClick={(e) => this.onUpdate(e)}>
            <Glyphicon glyph="pencil" /> Update
          </Button>
          <Button bsStyle="danger" bsSize="xsmall" onClick={(e) => this.onDestroy(e)}>
            <Glyphicon glyph="trash" /> Destroy
          </Button>
        </ButtonToolbar>
      </Popover>);

    return (
      <foreignObject width="24px" height="22px" x={coords.x} y={coords.y}>
        <OverlayTrigger trigger="click" rootClose placement="top" overlay={actualWindow}>
          <Button type="button" bsSize="xsmall" className={s.trigger_button}>
            <span
              className="glyphicon glyphicon-option-horizontal"
              style={{ position: 'static' }}
            />
          </Button>
        </OverlayTrigger>
      </foreignObject>
    );
  }
}