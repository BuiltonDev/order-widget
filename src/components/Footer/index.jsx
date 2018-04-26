import React from 'react';
import PropTypes from 'prop-types';
import Notification from 'src/components/Notification';

const Footer = (props) => {
  return (
    <div className="kvass-widget__content-footer">
      <div className="footer-content">
        {props.children}
      </div>
      <Notification />
    </div>
  );
};

Footer.defaultProps = {
  //showCloseNav: true
};

Footer.propTypes = {
  //showCloseNav: PropTypes.bool
};

export default Footer;
