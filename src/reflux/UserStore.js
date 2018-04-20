import Reflux from 'reflux';
import auth0 from 'auth0-js';
import {Auth0Config} from 'src/utils';
import Actions from './Actions';

class UserStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      verifyCode: '',
      error: ''
    };
    this.webAuth = new auth0.WebAuth({
      domain: Auth0Config().domain,
      clientID: Auth0Config().clientId,
      responseType: 'token'
    });
    this.listenables = Actions;
  }

  onUserDetailsInput(type, data) {
    this.setState({[type]: data});
  }

  onSendSms() {
    this.setState();
    /*
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
    */
  }

  onVerifyCode() {
    this.setState();
    /*
    this.webAuth.passwordlessLogin({
      connection: 'sms',
      phoneNumber: this.state.phoneNumber,
      verificationCode: this.state.verifyCode
    }, function (err,res) {
        if (err) {
          console.log(err);
        } else {
          // Success
          console.log(res);
        }
      }
    );
    */
  }
}

export default UserStore;
