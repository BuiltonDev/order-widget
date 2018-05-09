import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Spinner = (props) => {
  const {show} = props;
  const spinnerClass = classNames({
    'spinner-container': true,
    'spinner-container--hidden': !show
  });
  return (
    <div className={spinnerClass}>
      <div className="loader"></div>
    </div>
  );
};

Spinner.defaultProps = {
  show: false
};

Spinner.propTypes = {
  show: PropTypes.bool
};

export default Spinner;
