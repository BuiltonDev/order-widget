import React from 'react';
import PropTypes from 'prop-types';

const Spinner = (props) => {
  const {show} = props;
  return (
    <div>
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
