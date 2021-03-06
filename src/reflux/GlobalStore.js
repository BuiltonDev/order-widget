import Reflux from 'reflux';
import cloneDeep from 'lodash.clonedeep';
import T from 'src/utils/i18n';
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

  onGlobalReset() {
    this.setState(cloneDeep(INITIAL_STATE));
    Actions.onNavigationReset();
    Actions.onUserReset();
    Actions.onDeliveryReset();
    Actions.onPaymentReset();
    Actions.onProductReset();
    Actions.onOrderReset();
  }

  onCloseMessage() {
    this.setState({message: ''});
  }

  onMessage({isError = false}, message) {
    if (this.state.message) return; // Only allow one message for now
    const defaultMsg = isError ? T.translate('global.defaultError') : '';
    this.setState({message: message || defaultMsg});

    setTimeout(() => {
      this.setState({message: ''});
    }, this.notificationTTL);
  }
}

export default GlobalStore;
