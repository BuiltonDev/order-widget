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
import Kvass from '@kvass.ai/core-sdk';
import Footer from 'src/components/Footer';
import Animate from '../../utils/animate';

class UserDetails extends Reflux.Component {
  static renderHeader() {
    return (
      <Header showBackNav={true}>
        <span className="header-title">{T.translate('userDetails.header')}</span>
      </Header>
    )
  }

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
    this.kvass = new Kvass();
    this.animation = new Animate();

    this.authenticateWithApi = this.authenticateWithApi.bind(this);
    this.removeAuthentication = this.removeAuthentication.bind(this);
    this.renderExistingUser = this.renderExistingUser.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => Actions.onAuthStateChanged(user));
    this.animation.animateInViewTransition();
  }

  componentDidMount() {
    this.animation.animateInViewTransition();
  }

  componentDidUpdate() {
    this.animation.animateInViewTransition();
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
    this.kvass.refreshBearerToken(this.state.idToken);
    this.kvass.user().login({body: profile}, (err, apiUser, raw) => {
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
        placeholder={T.translate(`userDetails.${type}`)}
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
        <p className="in-page-transition">{T.translate('userDetails.detailsInfo')}</p>
        <div className="kvass-widget__input-container in-page-transition">
          {this.renderInput('firstName')}
        </div>
        <div className="kvass-widget__input-container in-page-transition">
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
        <div className="default-user-avatar-container in-page-transition">
          <UserIcon className="svg-icon--primary avatar"/>
        </div>
        <span className="userName in-page-transition">{this.state.firstName} {this.state.lastName}</span>
        <span className="phoneNumber in-page-transition">{this.state.phoneNumber}</span>
        <span className="in-page-transition">
          <a className="notYou" href="#" onClick={this.removeAuthentication}>
            {T.translate('userDetails.notYou')}
          </a>
        </span>
      </div>
    );
  }

  renderFooter() {
    return (
      <Footer>
        <button
          disabled={!this.state.isVerified}
          className="kvass-widget__primary-button"
          onClick={this.authenticateWithApi}
        >
          {T.translate('global.next')}
        </button>
      </Footer>
    );
  }

  render() {
    const isAuthComplete = this.state.isVerified && this.state.isAuthenticated;

    return (
      <div className="user-details">
        {this.constructor.renderHeader()}
        <div className="kvass-widget__content-body">
          <Spinner show={this.state.isLoading} />
          <div className="content">
            {isAuthComplete ?
              this.renderExistingUser()
              :
              this.renderAuthProcess(this.state.isVerified)}
          </div>
          {this.renderFooter()}
        </div>
      </div>
    );
  }
}

export default UserDetails;
