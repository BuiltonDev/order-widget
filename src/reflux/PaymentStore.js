import Reflux from 'reflux';
import cloneDeep from 'lodash.clonedeep';
import Actions from './Actions';

const INITIAL_STATE = {
  selectedPaymentMethod: ''
};

class PaymentStore extends Reflux.Store {
  constructor() {
    super();
    this.state = cloneDeep(INITIAL_STATE);
    this.listenables = Actions;
  }

  onPaymentReset() {
    this.setState(cloneDeep(INITIAL_STATE));
  }

  onSelectPaymentMethod(selectedPaymentMethod) {
    if (!selectedPaymentMethod) return;
    this.setState({selectedPaymentMethod});
  }
}

export default PaymentStore;
