import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Spinner = (props) => {
  const {show, showOverlay} = props;
  const spinnerClass = classNames({
    'spinner-container': true,
    'spinner-container--hidden': !show,
    overlay: showOverlay
  });
  return (
    <div className={spinnerClass}>
      <div className="loader"></div>
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
