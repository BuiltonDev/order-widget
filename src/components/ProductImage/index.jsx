import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>'

const ProductImage = (props) => {
  let src = DEFAULT_IMAGE;
  if (props.imageUrl) src = `${props.endpoint}images/${props.imageUrl}?api_key=${props.apiKey}`;
  return (
    <img onError={(ev) => {ev.target.src = DEFAULT_IMAGE}} src={src} alt="product image"/>
  );
};

ProductImage.propTypes = {
  imageUrl: PropTypes.string,
  endpoint: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired
};

export default ProductImage;
