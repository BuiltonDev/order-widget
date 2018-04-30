import React from 'react';
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

export default Footer;
