import Reflux from 'reflux';
import Actions from './Actions';

class UserStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      isSignedIn: false,
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      idToken: '',
      apiUser: null
    };
    this.listenables = Actions;
  }

  onUserDetailsInput(type, value) {
    this.setState({[type]: value});
  }

  onAuthStateChanged(user) {
    if (user && !this.state.idToken) {
      const phoneNumber = user.phoneNumber;
      const email = user.email;
      user.getIdToken().then((accessToken) => {
        this.setState({isSignedIn: !!user, idToken: accessToken, phoneNumber, email});
      }).catch((err) => {
        // TODO Handle error
      });
    }
  }
}

export default UserStore;
