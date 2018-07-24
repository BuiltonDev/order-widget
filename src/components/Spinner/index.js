import React from 'react';
import PropTypes from 'prop-types';

const Spinner = (props) => {
  const {show, showOverlay} = props;
  return (
    <div className={`spinner-container ${showOverlay && 'overlay'} ${!show && 'spinner-container--hidden'}`}>
      <div className="loader" />
    </div>
  );
};

Spinner.defaultProps = {
  show: false,
  showOverlay: true
};

Spinner.propTypes = {
  show: PropTypes.bool,
  showOverlay: PropTypes.bool
};

export default Spinner;
