import React from 'react';
import Reflux from 'reflux';
import {StripeProvider, Elements} from 'react-stripe-elements';
import Header from 'src/components/Header';
import Spinner from 'src/components/Spinner';
import PaymentForm from 'src/components/PaymentForm';
import Actions from 'src/reflux/Actions';
import T from 'src/utils/i18n';
import {StripeApiKey} from 'src/utils';
import PaymentStore from 'src/reflux/PaymentStore';
import {ShareActor} from 'src/utils';

class PaymentDetails extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = PaymentStore;
    this.storeKeys = ['stripeToken'];
    this.state = {
      isLoading: true,
      stripe: null // stripe instance
    };
    this.stripeApiKey = StripeApiKey();
    this.sa = ShareActor();
    this.addPaymentMethod = this.addPaymentMethod.bind(this);
    this.onError = this.onError.bind(this);
  }

  componentDidMount() {
    if (window.Stripe) {
      this.setState({stripe: this.stripeApiKey, isLoading: false});
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({stripe: this.stripeApiKey, isLoading: false});
      });
    }
  }

  onError(error) {
    console.log(error);
    this.setState({isLoading: false});
  }

  addPaymentMethod() {
    if (!this.state.stripeToken) return;
    this.setState({isLoading: true});

    const paymentMethodPayload = {payment_method: 'stripe', token: this.state.stripeToken};
    this.sa.paymentMethod().create({body: paymentMethodPayload}, (err, paymentMethod, raw) => {
      if (err) {
        this.onError(err);
        return;
      }
      Actions.onAddPaymentMethod(paymentMethod);
      Actions.onNextNavigation();
    });
  }

  render() {
    const {isLoading, stripeToken} = this.state;
    return (
      <div className="payment-details">
        <Header showBackNav={true}>
          <span className="header-title">{T.translate('paymentDetails.header')}</span>
        </Header>
        <div className="kvass-widget__content-body">
          <Spinner show={isLoading}></Spinner>
          <div className="content">
            <div className="padding-container">
              <StripeProvider apiKey={this.stripeApiKey}>
                <Elements>
                  <PaymentForm />
                </Elements>
              </StripeProvider>
            </div>
          </div>
          <div className="kvass-widget__content-footer">
            <div className="footer-content">
              <button className="kvass-widget__primary-button" disabled={!stripeToken} onClick={this.addPaymentMethod}>{T.translate('paymentDetails.pay')}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentDetails;
