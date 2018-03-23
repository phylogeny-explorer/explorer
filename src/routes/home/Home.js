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
import s from './Home.css';


class Home extends React.Component {

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.title}>Home</h1>
          <ul className={s.news}>
           Welcome to the Phylogeny Explorer Project
          </ul>
        </div>
      </div>
    );
  }
}
;


export default withStyles(s)(Home);
