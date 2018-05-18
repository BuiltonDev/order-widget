import React from 'react';
import Reflux from 'reflux';
import {DebounceInput} from 'react-debounce-input';
import firebase from 'firebase/app';
import 'firebase/auth';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';
import Header from 'src/components/Header';
import Spinner from 'src/components/Spinner';
import UserIcon from 'src/components/SvgIcons/UserIcon';
import UserStore from 'src/reflux/UserStore';
import Actions from 'src/reflux/Actions';
import T from 'src/utils/i18n';
import ShareActor from '@shareactor/shareactor-sdk';

class UserDetails extends Reflux.Component {
  constructor(props) {
    super(props);
    this.uiConfig = {
      signInFlow: 'popup',
      signInOptions: [
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          defaultCountry: 'NO' // TODO Set from config
        }
      ],
      callbacks: {
        // Avoid redirects after sign-in.
        signInSuccess: () => false
      }
    };
    this.store = UserStore;
    this.state = {
      isLoading: false
    };
    this.sa = new ShareActor();
    this.authenticateWithApi = this.authenticateWithApi.bind(this);
    this.removeAuthentication = this.removeAuthentication.bind(this);
    this.renderExistingUser = this.renderExistingUser.bind(this);
    this.renderInput = this.renderInput.bind(this);
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => Actions.onAuthStateChanged(user));
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  // Authenticate user with our API
  authenticateWithApi() {
    this.setState({isLoading: true});
    const profile = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      phone_number: this.state.phoneNumber,
      email: this.state.email
    };
    // Add the idToken from successful firebase authentication
    this.sa.refreshBearerToken(this.state.idToken);
    this.sa.user().login({body: profile}, (err, apiUser, raw) => {
      this.setState({isLoading: false});
      if (err) {
        Actions.onMessage({isError: true});
        this.removeAuthentication();
        return;
      }
      Actions.onAuthenticateUser(apiUser, profile);
      Actions.onNextNavigation();
    });
  }

  removeAuthentication() {
    this.setState({isLoading: true});
    Actions.onUserRemoveAuth();
    firebase.auth().signOut();
    this.setState({isLoading: false});
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

  renderUserVerifyStep() {
    return (
      <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
    );
  }

  renderUserDetailsStep() {
    return (
      <div className="user-details__additional">
        <p>{T.translate('userDetails.detailsInfo')}</p>
        <div className="kvass-widget__input-container">
          {this.renderInput('firstName')}
        </div>
        <div className="kvass-widget__input-container">
          {this.renderInput('lastName')}
        </div>
      </div>
    );
  }

  // Verify & Auth process
  // TODO - Transition between these two steps
  renderAuthProcess(isVerified) {
    return isVerified ? this.renderUserDetailsStep() : this.renderUserVerifyStep();
  }

  // Show avatar and let user select this or reapply verification process
  renderExistingUser() {
    return (
      <div className="user-details__existing-user">
        <div className="default-user-avatar-container">
          <UserIcon className="svg-icon--primary avatar"/>
        </div>
        <span className="userName">{this.state.firstName} {this.state.lastName}</span>
        <span className="phoneNumber">{this.state.phoneNumber}</span>
        <a href="#" onClick={this.removeAuthentication}>{T.translate('userDetails.notYou')}</a>
      </div>
    );
  }

  render() {
    const isAuthComplete = this.state.isVerified && this.state.isAuthenticated;
    return (
      <div className="user-details">
        <Header showBackNav={true}>
          <span className="header-title">{T.translate('userDetails.header')}</span>
        </Header>
        <div className="kvass-widget__content-body">
          <Spinner show={this.state.isLoading}></Spinner>
          <div className="content">
            <div className="padding-container">
              {isAuthComplete ? this.renderExistingUser() : this.renderAuthProcess(this.state.isVerified)}
            </div>
          </div>
          <div className="kvass-widget__content-footer">
            <div className="footer-content">
              <button disabled={!this.state.isVerified} className="kvass-widget__primary-button" onClick={this.authenticateWithApi}>{T.translate('global.next')}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserDetails;
