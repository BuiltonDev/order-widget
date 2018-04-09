import React from 'react';
import PropTypes from 'prop-types';
import Actions from 'src/reflux/Actions';
import BackIcon from 'src/components/SvgIcons/BackIcon';
import CloseIcon from 'src/components/SvgIcons/CloseIcon';

const Header = (props) => {
  const {showBackNav, showCloseNav} = props;
  const backNav = () => {
    return (
      <div className="previous-navigation" onClick={() => Actions.onPreviousNavigation()}>
        <BackIcon className="svg-icon--primary"></BackIcon>
      </div>
    );
  };
  const closeNav = () => {
    return (
      <div className="close-widget" onClick={() => window.KvassOrdering.close()}>
        <CloseIcon className="svg-icon--primary"></CloseIcon>
      </div>
    );
  };

  return (
    <div className="kvass-widget__content-header">
      {showBackNav ? backNav() : null}
      {showCloseNav ? closeNav() : null}
      {props.children}
    </div>
  );
};

Header.defaultProps = {
  showCloseNav: true,
  showBackNav: false
};

Header.propTypes = {
  showCloseNav: PropTypes.bool,
  showBackNav: PropTypes.bool
};

export default Header;
