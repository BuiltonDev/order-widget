import React from 'react';
import Reflux from 'reflux';
import {DebounceInput} from 'react-debounce-input';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import Header from 'src/components/Header';
import Spinner from 'src/components/Spinner';
import Actions from 'src/reflux/Actions';
import T from 'src/utils/i18n';
import UserStore from 'src/reflux/UserStore';

class UserDetails extends Reflux.Component {
  constructor(props) {
    super(props);
    this.uiConfig = {
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
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
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => Actions.onAuthStateChanged(user));
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  onNext() {
    if (this.state.isSignedIn) {
      this.setState({isLoading: true});
      Actions.onApiAuth().then(() => {
        this.setState({isLoading: false});
        Actions.onNextNavigation();
      });
    }
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

  renderFirebaseVerify() {
    return (
      <StyledFirebaseAuth uiCallback={ui => ui.disableAutoSignIn()} uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
    );
  }

  renderUserDetails() {
    return (
      <div>
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

  renderExistingUser() {
    // Show avatar and let user select this or reapply verification process
  }

  render() {
    return (
      <div className="user-details">
        <Header showBackNav={true}>
          <span className="header-title">{T.translate('userDetails.header')}</span>
        </Header>
        <div className="kvass-widget__content-body">
          <Spinner show={this.state.isLoading}></Spinner>
          <div className="content">
            <div className="padding-container">
              {this.state.isSignedIn ? this.renderUserDetails() : this.renderFirebaseVerify()}
            </div>
          </div>
          <div className="kvass-widget__content-footer">
            <div className="footer-content">
              <button disabled={!this.state.isSignedIn} className="kvass-widget__primary-button" onClick={this.onNext}>{T.translate('global.next')}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserDetails;
