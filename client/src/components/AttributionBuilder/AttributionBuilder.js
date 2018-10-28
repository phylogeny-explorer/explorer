import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AttributionBuilder.css';
import { AttributionType } from 'common/databases/public/constants';
import { Preview as CitationPreview } from "../Citation";
import {
  Attribution,
  OriginalAttribution,
  VideAttribution,
  EmendedAttribution,
  SensuAttribution,
  NonAttribution,
} from './Attribution';
import uuid from 'uuid/v4';
import {
  Dropdown,
  MenuItem,
  Glyphicon
} from 'react-bootstrap';

class AttributionsBuilder extends React.Component {

  constructor(props)
  {
    super(props);
    this.props.attributions.forEach(AttributionsBuilder._decorateAttribution);

    this.delete = this.delete.bind(this);
    this.onAttributionChanged = this.onAttributionChanged.bind(this);
  }

  addAttribution(type)
  {
    this.props.onAttributionsChange([
      ...this.props.attributions,
      AttributionsBuilder._decorateAttribution({type})
    ]);
  }

  static _decorateAttribution(attribution)
  {
    attribution.index = uuid();
    attribution.errors = [];
    return attribution;
  }

  delete(deletedAttribution)
  {
    this.props.onAttributionsChange(
      this.props.attributions.filter(attribution => (attribution.index !== deletedAttribution.index))
    );
  }

  onAttributionChanged(updatedAttribution)
  {
    const attributions = [...this.props.attributions];
    const index = this.props.attributions.findIndex(attribution => (attribution.index === updatedAttribution.index));
    attributions[index] = updatedAttribution;
    this.props.onAttributionsChange(attributions);
  }

  getAttributionsByType(type)
  {
    return this.props.attributions.filter(attribution => (attribution.type === type));
  }

  render()
  {
    let original = this.getAttributionsByType(AttributionType.Original).pop();
    let vide = this.getAttributionsByType(AttributionType.Vide).pop();

    let otherAttributions = this.props.attributions.filter(attribution => {
      return (
        attribution.type !== AttributionType.Original &&
        attribution.type !== AttributionType.Vide
      );
    });

    const menuTypes = Object.keys(AttributionType).filter(type => {
      if (type === AttributionType.Original && original) return false;
      if (type === AttributionType.Vide && vide) return false;
      return true;
    });

    return (
      <div className={s.attributions}>
        <CitationPreview attributions={this.props.attributions} cladeName={this.props.cladeName} />

        { original &&
          <OriginalAttribution attribution={original} onDelete={this.delete} onChange={this.onAttributionChanged} />
        }

        { vide &&
          <VideAttribution attribution={vide} onDelete={this.delete} onChange={this.onAttributionChanged} />
        }

        {otherAttributions.map(attribution => {
          let AttributionComponent;

          switch(attribution.type) {
            case AttributionType.Emended:
              AttributionComponent = EmendedAttribution;
              break;

            case AttributionType.Sensu:
              AttributionComponent = SensuAttribution;
              break;

            case AttributionType.Non:
              AttributionComponent = NonAttribution;
              break;

            default:
              AttributionComponent = Attribution;
          }

          return <AttributionComponent
            key={attribution.index}
            attribution={attribution}
            onDelete={this.delete}
            onChange={this.onAttributionChanged}
          />
        })}

        <Dropdown id="addbutton">
          <Dropdown.Toggle bsStyle="success"><Glyphicon glyph="plus" /> Add Attribution</Dropdown.Toggle>
          <Dropdown.Menu>
            {menuTypes.map(type => (
              <MenuItem id={type} eventKey={type} key={type} onSelect={() => this.addAttribution(type)}>
                {AttributionType[type]}
              </MenuItem>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default withStyles(s)(AttributionsBuilder);
