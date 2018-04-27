import React from 'react'
import Reflux from 'reflux'
import {CardElement, injectStripe} from 'react-stripe-elements';
import T from 'src/utils/i18n';
import Actions from 'src/reflux/Actions';
import PaymentStore from 'src/reflux/PaymentStore';
import {ShareActor} from 'src/utils';

class PaymentForm extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = PaymentStore;
    this.sa = ShareActor();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.stripe.createToken().then(payload => {
      const paymentMethodPayload = {payment_method: 'stripe', token: payload.token.id};
      this.sa.paymentMethod().create({body: paymentMethodPayload}, (err, paymentMethod, raw) => {
        if (err) {
          Actions.onMessage({isError: true});
          return;
        }

        this.setState({isLoading: false});

        Actions.onSelectPaymentMethod(paymentMethod);
      });
    });
  }

  render() {
    return (
      <form className="kvass-widget__input-container payment-form" onSubmit={this.handleSubmit}>
        <CardElement />
        <button className="kvass-widget__primary-button" type="submit">{T.translate('paymentDetails.addNewCard')}</button>
      </form>
    );
  }
}
// Use Higher-Order Component (HOC)
export default injectStripe(PaymentForm);
