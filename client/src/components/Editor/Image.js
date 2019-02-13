import React from 'react';
import PropTypes from 'prop-types';

const Image = (props) => (
  <div className="text-center">
    <img alt="asset" src={props.src} />
  </div>
);

Image.propTypes = {
  src: PropTypes.string,
};

export default Image;
