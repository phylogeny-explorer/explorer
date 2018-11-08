import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';

class Footer extends React.Component {
  render() {
    const date = new Date();
    return (
      <div className={s.root}>
        <span className={s.text}>©{date.getFullYear()} <a href="//phylogenyexplorerproject.com/">Phylogeny Explorer Project</a></span>
      </div>
    );
  }
}

export default withStyles(s)(Footer);