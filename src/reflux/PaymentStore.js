import Reflux from 'reflux';
import Actions from './Actions';

class PaymentStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      selectedPaymentMethod: ''
    };
    this.listenables = Actions;
  }

  onSelectPaymentMethod(selectedPaymentMethod) {
    if (!selectedPaymentMethod) return;
    this.setState({selectedPaymentMethod});
  }
}

export default PaymentStore;
