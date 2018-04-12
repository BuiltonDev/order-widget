import React from 'react';
import Reflux from 'reflux';
import {DebounceInput} from 'react-debounce-input';
import Header from 'src/components/Header';
import Actions from 'src/reflux/Actions';
import T from 'src/utils/i18n';
import UserStore from 'src/reflux/UserStore';

class UserDetails extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = UserStore;
  }

  renderInput(type, isDisabled = false, minLength = 0) {
    return (
      <DebounceInput
        className="kvass-widget__input"
        minLength={minLength}
        type="string"
        disabled={isDisabled}
        debounceTimeout={300}
        placeholder={T.translate('userDetails.' + type)}
        value={this.state[type]}
        onChange={event => Actions.onUserDetailsInput(type, event.target.value)}
      />
    );
  }

  render() {
    return (
      <div className="user-details">
        <Header showBackNav={true}>
          <span className="header-title">{T.translate('userDetails.header')}</span>
        </Header>
        <div className="kvass-widget__content-body">
          <div className="content">
            <div className="padding-container">
              <p>{T.translate('userDetails.detailsInfo')}</p>
              <div className="kvass-widget__input-container">
                {this.renderInput('firstName')}
              </div>
              <div className="kvass-widget__input-container">
                {this.renderInput('lastName')}
              </div>
              <p>{T.translate('userDetails.verifyInfo')}</p>
              <div className="kvass-widget__input-container">
                {this.renderInput('phoneNumber', (!this.state.firstName || !this.state.lastName))}
                <button disabled={!this.state.phoneNumber} className="kvass-widget__primary-button" onClick={() => Actions.onSendSms()}>Send</button>
              </div>
              <div className="kvass-widget__input-container">
                {this.renderInput('verifyCode', !this.state.phoneNumber)}
                <button disabled={!this.state.phoneNumber} className="kvass-widget__primary-button" onClick={() => Actions.onVerifyCode()}>Verify</button>
              </div>
            </div>
          </div>
          <div className="kvass-widget__content-footer">
            <div className="footer-content">
              <button className="kvass-widget__primary-button" onClick={() => Actions.onNextNavigation()}>{T.translate('global.next')}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserDetails;
