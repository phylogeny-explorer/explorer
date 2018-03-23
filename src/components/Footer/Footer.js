/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 02/10/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';
import Link from '../Link';


function Footer() {
  return (
    <div className={`${s.root}`}>
      <div className={s.container}>
        <span className={s.text}>© Phylogeny Explorer</span>
        <span className={s.spacer}>·</span>
        <Link className={s.link} to="/">Home</Link>
        <span className={s.spacer}>·</span>
      </div>
    </div>
  );
}

export default withStyles(s)(Footer);
