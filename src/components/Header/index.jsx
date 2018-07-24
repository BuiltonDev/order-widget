import React from 'react';
import PropTypes from 'prop-types';
import Actions from 'src/reflux/Actions';
import BackIcon from 'src/components/SvgIcons/BackIcon';
import CloseIcon from 'src/components/SvgIcons/CloseIcon';

const Header = (props) => {
  const {showBackNav, showCloseNav, backStep} = props;

  const backNav = () => (
    <div
      className="previous-navigation"
      onClick={
        () =>
          (backStep !== null ? Actions.onNavigateTo(backStep) : Actions.onPreviousNavigation())
      }
    >
      <BackIcon className="svg-icon--primary" />
    </div>
  );

  const closeNav = () => (
    <div
      className="close-widget-icon"
      onClick={
        () => window.KvassOrdering.close()
      }
    >
      <CloseIcon className="svg-icon--primary" />
    </div>
  );

  return (
    <div className="kvass-widget__content-header">
      <div className="kvass-widget_inner-content-header">
        {showBackNav ? backNav() : null}
        {showCloseNav ? closeNav() : null}
        {props.children}
      </div>
    </div>
  );
};

Header.defaultProps = {
  showCloseNav: true,
  showBackNav: false,
  backStep: null,
  children: undefined
};

Header.propTypes = {
  showCloseNav: PropTypes.bool,
  showBackNav: PropTypes.bool,
  backStep: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.instanceOf(React.Component)
  ])
};

export default Header;
