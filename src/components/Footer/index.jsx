import React from 'react';
import Notification from 'src/components/Notification';
import T from 'src/utils/i18n';
import KvassIcon from 'src/components/SvgIcons/KvassIcon';

const Footer = (props) => {
  return (
    <div className="kvass-widget__content-footer">
      <div className="footer-content">
        {props.children}
        <div className="kvass-widget_powered-by">
          <a href="https://kvass.ai">
            <span>{T.translate('global.poweredBy')}</span>{' '}
            <KvassIcon className="svg-icon--powered-by"></KvassIcon>
          </a>
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default Footer;
