import Reflux from 'reflux';
import cloneDeep from 'lodash.clonedeep';
import Actions from './Actions';

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
    this.setState({...cloneDeep(INITIAL_STATE)});
  }

  onUserDetailsInput(type, value) {
    this.setState({[type]: value});
  }

  onAuthStateChanged(user) {
    if (user && !this.state.idToken) {
      const phoneNumber = user.phoneNumber;
      const email = user.email;
      user.getIdToken().then((accessToken) => {
        this.setState({isAuthenticated: !!user, isVerified: !!user, idToken: accessToken, phoneNumber, email});
      }).catch((err) => {
        // TODO Handle error
      });
    }
  }
}

export default UserStore;
