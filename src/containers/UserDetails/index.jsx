import React from 'react';
import Reflux from 'reflux';
import {DebounceInput} from 'react-debounce-input';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import Header from 'src/components/Header';
import Spinner from 'src/components/Spinner';
import UserIcon from 'src/components/SvgIcons/UserIcon';
import UserStore from 'src/reflux/UserStore';
import Actions from 'src/reflux/Actions';
import T from 'src/utils/i18n';
import {ShareActor} from 'src/utils';

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

    this.authenticateWithApi = this.authenticateWithApi.bind(this);
    this.removeAuthentication = this.removeAuthentication.bind(this);
    this.renderExistingUser = this.renderExistingUser.bind(this);
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
    ShareActor().refreshBearerToken(this.state.idToken);
    ShareActor().user().login({body: profile}, (err, apiUser, raw) => {
      this.setState({isLoading: false});
      if (err) {
        // TODO Handle error message
        this.removeAuthentication();
        return;
      }
      Actions.onUserDetailsInput('apiUser', apiUser);
      Actions.onUserDetailsInput('isAuthenticated', true);
      Actions.onNextNavigation();
    });
  }

  removeAuthentication() {
    this.setState({isLoading: true});
    Actions.onResetAuth();
    firebase.auth().signOut();
    // Wait a bit before continuing with auth
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 300);
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
      <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
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
        <UserIcon className="svg-icon--primary avatar"/>
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
