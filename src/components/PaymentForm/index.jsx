import React from 'react'
import Reflux from 'reflux'
import {CardElement, injectStripe} from 'react-stripe-elements';
import T from 'src/utils/i18n';
import Actions from 'src/reflux/Actions';
import PaymentStore from 'src/reflux/PaymentStore';

class PaymentForm extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = PaymentStore;

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // {name: 'Jenny Rosen'}
    this.props.stripe.createToken().then(payload => {
      console.log(payload);
      Actions.onStripeToken(payload.id);
    });
  }

  render() {
    return (
      <form className="payment-form" onSubmit={this.handleSubmit}>
        <label>
          {T.translate('paymentDetails.cardDetails')}
          <CardElement />
        </label>
        <div className="pay-button">
          <button className="kvass-widget__primary-button">Pay</button>
        </div>
      </form>
    );
  }
}
// Use Higher-Order Component (HOC)
export default injectStripe(PaymentForm);
