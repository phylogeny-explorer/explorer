import React from 'react';
import PropTypes from 'prop-types';
import { Entity } from 'draft-js';
import Image from './Image';

const Media = ({ block }) => {
  const entity = Entity.get(block.getEntityAt(0));
  const { src } = entity.getData();
  return <Image src={src} />;
};

Media.propTypes = {
  block: PropTypes.shape({
    getEntityAt: PropTypes.func,
  }),
};

export default Media;
