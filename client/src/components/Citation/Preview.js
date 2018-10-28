import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Citation.css';
import { Citation as AttributionsCitation } from '../Citation';

export default withStyles(s)(({attributions, cladeName}) => (
  attributions.length > 0 &&
  <div className={s.preview_container}>
    <p className={s.preview_header}>Preview:</p>
    <p className={s.preview}>
      <AttributionsCitation attributions={attributions} clade={cladeName}/>
    </p>
  </div>
));