import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import firebase from 'firebase';
import 'react-dates/initialize';
import {FirebaseConfig} from 'src/utils';
import NavigationStore from 'src/reflux/NavigationStore';
import Actions from 'src/reflux/Actions';
import KvassIcon from 'src/components/SvgIcons/KvassIcon'
import T from 'src/utils/i18n';

class App extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = NavigationStore;

    if (!firebase.apps.length) {
      firebase.initializeApp(FirebaseConfig());
      firebase.auth().useDeviceLanguage();
    }
  }

  componentWillUnmount() {
    Actions.onGlobalReset();
  }

  renderCurrentNav() {
    const {step, navComponents} = this.state;
    return React.createElement(navComponents[step]);
  }

  render() {
    const className = classNames({
      'kvass-widget': true,
      'kvass-widget--open': this.props.isOpen,
      'kvass-widget--close': !this.props.isOpen
    });

    return (
      <div id="kvass-widget" className={className}>
        <div className="kvass-widget__overlay"></div>
          <div className="kvass-widget__container">
            {this.renderCurrentNav()}
            <div className="kvass-widget_powered-by">
              <span>{T.translate('global.poweredBy')}</span>{' '}
              <KvassIcon className="svg-icon--powered-by"></KvassIcon>
            </div>
          </div>
      </div>
    );
  }
}

App.propTypes = {
  isOpen: PropTypes.bool
};

export default App;
