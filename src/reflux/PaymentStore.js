import Reflux from 'reflux';
import Actions from './Actions';

class PaymentStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      stripeToken: null
    };
    this.listenables = Actions;
  }

  onStripeToken(stripeToken) {
    this.setState({stripeToken});
  }

}

export default PaymentStore;
