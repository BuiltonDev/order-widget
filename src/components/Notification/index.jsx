import React from 'react';
import Reflux from 'reflux';
import Actions from 'src/reflux/Actions';
import GlobalStore from 'src/reflux/GlobalStore';
import CloseIcon from 'src/components/SvgIcons/CloseIcon';

class Notification extends Reflux.Component {
  static closeNotification() {
    Actions.onCloseMessage();
  }

  constructor(props) {
    super(props);
    this.store = GlobalStore;
    this.storeKeys = ['message'];
  }

  render() {
    const {message} = this.state;

    return (
      <div className={`kvass-widget__notification ${!message && 'kvass-widget__notification--close'}`}>
        <div className="close-widget-icon" onClick={this.constructor.closeNotification}>
          <CloseIcon className="svg-icon--secondary" />
        </div>
        <div className="message">
          {message}
        </div>
      </div>
    );
  }
}

export default Notification;
