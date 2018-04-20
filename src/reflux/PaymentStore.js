import Reflux from 'reflux';
import Actions from './Actions';

class PaymentStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      stripeToken: null,
      paymentMethod: null
    };
    this.listenables = Actions;
  }

  onStripeToken(stripeToken) {
    this.setState({stripeToken});
  }

  onAddPaymentMethod(paymentMethod) {
    this.setState({paymentMethod});
  }

}

export default PaymentStore;
