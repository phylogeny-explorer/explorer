/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Button, Popover, ButtonToolbar, Glyphicon } from 'react-bootstrap';
import Link from '../Link';
import history from '../../core/history';
import { Citation as AttributionsCitation } from '../Citation';
import s from './Cladogram.css';

export default class Pane extends React.Component {

  static propTypes = {
    id: PropTypes.any.isRequired,
    name: PropTypes.any,
    otherNames: PropTypes.any,
    description: PropTypes.any,
    attributions: PropTypes.array,
    hasChildren: PropTypes.any,
  };

  onView() {
    history.push(`/clades/info/${this.props.id}`);
  }

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
      y: -12,
    };

    let description = this.strip(this.props.description);

    if (description.length > 200) {
      description = `${description.substring(0, 200)}...`;
    }

    const title = (
      <span>
        {this.props.name || '[UNNAMED]'}
        {this.props.otherNames && <small style={{display:'block', marginTop: '3px'}}>{this.props.otherNames}</small>}
      </span>
    );

    const actualWindow = (
      <Popover id="information-panel" title={title} className={s.info_window}>
        {
          this.props.attributions && this.props.attributions.length > 0 &&
          <small className={s.attribution}>
            <AttributionsCitation attributions={this.props.attributions}/>
          </small>
        }
        <div className={s.description}>{description || <i>No description available</i>}</div>
        <hr />
        <ButtonToolbar>
          <Button bsStyle="success" bsSize="xsmall" onClick={(e) => this.onView(e)}>
            <Glyphicon glyph="search" /> View
          </Button>
          <Button bsStyle="info" bsSize="xsmall" onClick={(e) => this.onUpdate(e)}>
            <Glyphicon glyph="pencil" /> Update
          </Button>
          <Button bsStyle="primary" bsSize="xsmall" onClick={(e) => this.onCreate(e)}>
            <Glyphicon glyph="random" /> Evolve
          </Button>
          <Button bsStyle="danger" bsSize="xsmall" onClick={(e) => this.onDestroy(e)}>
            <Glyphicon glyph="trash" /> Destroy
          </Button>
        </ButtonToolbar>
      </Popover>
    );

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

  strip(html) {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
}
