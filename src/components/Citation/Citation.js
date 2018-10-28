import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Citation.css';
import { AttributionType, SensuLabel } from 'common/databases/public/constants';
import uuid from "uuid/v4";

class AttributionsCitation extends React.Component {

  constructor(props)
  {
    super(props);
    this.props.attributions.forEach(attribution => (attribution.index = uuid()));
  }

  getAttributionsByType(type)
  {
    return this.props.attributions.filter(attribution => (attribution.type === type));
  }

  getCitationNameDate(attribution)
  {
    let citationParts = [];
    if (attribution.name) citationParts.push(attribution.name.trim());
    if (attribution.date) citationParts.push(attribution.date.trim());
    return citationParts.join(', ');
  }

  getOriginalCitation(attribution)
  {
    let prefix = attribution.isImplied ? '[implied in ' : '';
    let suffix = attribution.isImplied ? ']' : '';
    let citation = this.getCitationNameDate(attribution);
    return <span key={attribution.index} className={s.citation_part}>{prefix}{citation}{suffix}</span>;
  }

  getVideCitation(attribution)
  {
    let citation = this.getCitationNameDate(attribution);
    return <span key={attribution.index} className={s.citation_part}><i>vide</i> {citation}</span>;
  }

  getSensuCitation(attribution)
  {
    let citation = this.getCitationNameDate(attribution);
    let clade = attribution.sensuClade ? `"${attribution.sensuClade}"` : '';
    return <span key={attribution.index} className={s.citation_part}><i>{SensuLabel[attribution.sensuLabel]}</i> {citation} {clade}</span>
  }

  getNonCitation(attribution)
  {
    let citation = this.getCitationNameDate(attribution);
    let clade = attribution.sensuClade ? `"${attribution.sensuClade}"` : '';
    return <span key={attribution.index} className={s.citation_part}><i>non</i> {citation} {clade}</span>
  }

  getEmendedCitation(attribution)
  {
    let citation = this.getCitationNameDate(attribution);
    return <span key={attribution.index} className={s.citation_part}>emended {citation} "{attribution.emendedOldName}"</span>;
  }

  getAttributionComponent(attribution)
  {
    switch (attribution.type) {
      case AttributionType.Original:
        return this.getOriginalCitation(attribution);

      case AttributionType.Vide:
        return this.getVideCitation(attribution);

      case AttributionType.Sensu:
        return this.getSensuCitation(attribution);

      case AttributionType.Non:
        return this.getNonCitation(attribution);

      case AttributionType.Emended:
        return this.getEmendedCitation(attribution);
    }
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

    return (
      <span className={s.citation}>
        { this.props.clade && <b>{this.props.clade}</b> }
        { original && this.getAttributionComponent(original) }
        { vide && this.getAttributionComponent(vide) }
        { otherAttributions.map(attribution => (this.getAttributionComponent(attribution))) }
      </span>
    );
  }
}

export default withStyles(s)(AttributionsCitation);
