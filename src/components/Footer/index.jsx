import React from 'react';
import Notification from 'src/components/Notification';
import T from 'src/utils/i18n';
import PropTypes from 'prop-types';
import KvassIcon from 'src/components/SvgIcons/KvassIcon';

const Footer = props => (
  <div className="kvass-widget__content-footer">
    <div className="footer-content">
      {props.children}
      <div className="kvass-widget_powered-by">
        <a href="https://kvass.ai">
          <span>{T.translate('global.poweredBy')}</span>{' '}
          <KvassIcon className="svg-icon--powered-by" />
        </a>
      </div>
    </div>
    <Notification />
  </div>
);

Footer.defaultProps = {
  children: undefined
};

Footer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.instanceOf(React.Component)
  ])
};

export default Footer;
