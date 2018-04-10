import React from 'react';
import Reflux from 'reflux';
import auth0 from 'auth0-js';
import {DebounceInput} from 'react-debounce-input';
import Header from 'src/components/Header';
import Actions from 'src/reflux/Actions';
import T from 'src/utils/i18n';
import {Auth0Config} from 'src/utils';

class UserDetails extends Reflux.Component {
  constructor(props) {
    super(props);
    this.webAuth = new auth0.WebAuth({
      domain: Auth0Config().domain,
      clientID: Auth0Config().clientId,
      responseType: 'token'
    });

    this.state = {
      error: '',
      phoneNumber: '',
      code: ''
    };
  }

  sendSms() {
    this.webAuth.passwordlessStart({
      connection: 'sms',
      send: 'code',
      phoneNumber: this.state.phoneNumber
    }, function (err,res) {
        if (err) {
          console.log(err);
        } else {
          // Success
          console.log(res);
        }
      }
    );
  }

  verifyCode() {
    this.webAuth.passwordlessLogin({
      connection: 'sms',
      phoneNumber: this.state.phoneNumber,
      verificationCode: this.state.code
    }, function (err,res) {
        if (err) {
          console.log(err);
        } else {
          // Success
          console.log(res);
        }
      }
    );
  }

  onPhoneChange(event) {
    this.setState({phoneNumber: event.target.value});
  }

  onVerifyCodeChange(event) {
    this.setState({code: event.target.value});
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
              <div className="input-group">
                <DebounceInput
                  className="search-input"
                  minLength={5}
                  type="string"
                  debounceTimeout={500}
                  placeholder={T.translate('userDetails.phoneNumber')}
                  value={this.state.phoneNumber}
                  onChange={event => this.onPhoneChange(event)} />
                  <button className="kvass-widget__primary-button" onClick={() => this.sendSms()}>Send</button>
              </div>
              <div className="input-group">
                <DebounceInput
                  className="search-input"
                  minLength={3}
                  type="string"
                  debounceTimeout={500}
                  placeholder={T.translate('userDetails.verifyCode')}
                  value={this.state.code}
                  onChange={event => this.onVerifyCodeChange(event)} />
                  <button className="kvass-widget__primary-button" onClick={() => this.verifyCode()}>Verify</button>
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
