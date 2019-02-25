import React from 'react';
import PropTypes from 'prop-types';
import { Entity } from 'draft-js';
import Styles from './Styles';

const Link = (props) => {
  const { url } = Entity.get(props.entityKey).getData();
  return (
    <a href={url} style={Styles.link}>
      {props.children}
    </a>
  );
};

Link.propTypes = {
  children: PropTypes.array,
  entityKey: PropTypes.string,
};

export default Link;

export function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}
