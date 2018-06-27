import React from 'react'
import Reflux from 'reflux'
import PropTypes from 'prop-types';
import {CardElement, injectStripe} from 'react-stripe-elements';
import T from 'src/utils/i18n';
import Actions from 'src/reflux/Actions';
import PaymentStore from 'src/reflux/PaymentStore';
import Kvass from '@kvass.ai/core-sdk';

class PaymentForm extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = PaymentStore;
    this.kvass = new Kvass();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onStripePaymentAdded({isLoading: true});
    this.props.stripe.createToken().then(payload => {
      if (payload && payload.error) {
        this.props.onStripePaymentAdded({isLoading: false});
        Actions.onMessage({isError: true}, T.translate('paymentDetails.error', {errorCode: payload.error.code}));
        return;
      }
      const paymentMethodPayload = {payment_method: 'stripe', token: payload.token.id};
      this.kvass.paymentMethod().create({body: paymentMethodPayload}, (err, PaymentMethod, raw) => {
        this.props.onStripePaymentAdded({isLoading: false});

        if (err) {
          Actions.onMessage({isError: true});
          return;
        }

        Actions.onSelectPaymentMethod(PaymentMethod);
        Actions.onAddUserPaymentMethods([PaymentMethod]);
      });
    });
  }

  render() {
    return (
      <form className="kvass-widget__input-container payment-form" onSubmit={this.handleSubmit}>
        <CardElement />
        <button className="kvass-widget__secondary-button" type="submit">{T.translate('paymentDetails.addNewCard')}</button>
      </form>
    );
  }
}

PaymentForm.propTypes = {
  stripe: PropTypes.object.isRequired,
  onStripePaymentAdded: PropTypes.func.isRequired
};

// Use Higher-Order Component (HOC)
export default injectStripe(PaymentForm);
