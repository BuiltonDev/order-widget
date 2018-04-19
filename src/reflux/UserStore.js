import Reflux from 'reflux';
import Actions from './Actions';
import {authenticate} from 'src/network';

class UserStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      isSignedIn: false,
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      idToken: ''
    };
    this.listenables = Actions;
  }

  onApiAuth() {
    authenticate(this.state.idtoken, {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      phone_number: this.state.phoneNumber,
      email: this.state.email
    }).then((res) => {
      // Success
      console.log(res.body)
    }).catch((err) => {
      // TODO Handle error
    });
  }

  onAuthStateChanged(user) {
    if (user && !this.state.idToken) {
      const phoneNumber = user.phoneNumber;
      const email = user.email;
      user.getIdToken().then((accessToken) => {
        console.log('onAuthStateChanged');
        this.setState({isSignedIn: !!user, idToken: accessToken, phoneNumber, email});
      }).catch((err) => {
        // TODO Handle error
      });
    }
  }
}

export default UserStore;
