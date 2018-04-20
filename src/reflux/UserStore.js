import Reflux from 'reflux';
import cloneDeep from 'lodash.clonedeep';
import Actions from './Actions';
import storage from 'src/utils/storage';

const INITIAL_STATE = {
  isVerified: false,
  isAuthenticated: false,
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  idToken: '',
  apiUser: null
};

class UserStore extends Reflux.Store {

  constructor() {
    super();
    this.state = cloneDeep(INITIAL_STATE);
    this.listenables = Actions;
  }

  onResetAuth() {
    storage.remove(this.state.phoneNumber);
    this.setState({...cloneDeep(INITIAL_STATE)});
  }

  onUserDetailsInput(type, value) {
    this.setState({[type]: value});
  }

  onAuthenticateUser(apiUser, profile) {
    storage.set(this.state.phoneNumber, profile);
    this.setState({apiUser, isAuthenticated: true});
  }

  onAuthStateChanged(user) {
    if (user && !this.state.idToken) {
      const phoneNumber = user.phoneNumber;
      const email = user.email;
      user.getIdToken().then((accessToken) => {
        const storedUser = storage.get(phoneNumber);
        const firstName = storedUser ? storedUser.first_name : '';
        const lastName = storedUser ? storedUser.last_name : '';
        console.log(storedUser);
        this.setState({isAuthenticated: !!storedUser, isVerified: !!user, idToken: accessToken, phoneNumber, email, firstName, lastName});
      }).catch((err) => {
        // TODO Handle error
      });
    }
  }
}

export default UserStore;
