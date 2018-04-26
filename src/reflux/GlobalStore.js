import Reflux from 'reflux';
import cloneDeep from 'lodash.clonedeep';
import Actions from './Actions';

const INITIAL_STATE = {
  message: ''
};

class GlobalStore extends Reflux.Store {
  constructor() {
    super();
    this.notificationTTL = 10000; // 10s
    this.state = cloneDeep(INITIAL_STATE);
    this.listenables = Actions;
  }

  onReset() {
    this.setState(cloneDeep(INITIAL_STATE));
  }

  onCloseMessage() {
    this.setState({message: ''});
  }

  onMessage(message) {
    if (this.state.message) return; // Only allow one message for now
    this.setState({message});
    setTimeout(() => {
      this.setState({message: ''});
    }, this.notificationTTL);
  }

}

export default GlobalStore;
