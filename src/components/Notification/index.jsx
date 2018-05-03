import React from 'react'
import Reflux from 'reflux'
import classNames from 'classnames'
import T from 'src/utils/i18n';
import Actions from 'src/reflux/Actions';
import GlobalStore from 'src/reflux/GlobalStore';
import CloseIcon from 'src/components/SvgIcons/CloseIcon';

class Notification extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = GlobalStore;
    this.storeKeys = ['message'];
    this.closeNotifcation = this.closeNotifcation.bind(this);
  }

  closeNotifcation() {
    Actions.onCloseMessage();
  }

  render() {
    const {message} = this.state;
    const className = classNames('kvass-widget__notification', {
      'kvass-widget__notification--close': message ? false : true
    });

    return (
      <div className={className}>
        <div className="close-widget-icon" onClick={this.closeNotifcation}>
          <CloseIcon className="svg-icon--secondary"></CloseIcon>
        </div>
        <div className="message">{message}</div>
      </div>
    )
  }
}

export default Notification;
