import React, {Component} from 'react';
import {StripeProvider, Elements} from 'react-stripe-elements';
import Header from 'src/components/Header';
import Spinner from 'src/components/Spinner';
import PaymentForm from 'src/components/PaymentForm';
import Actions from 'src/reflux/Actions';
import T from 'src/utils/i18n';
import {StripeApiKey} from 'src/utils';


class PaymentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      stripe: null // stripe instance
    };
    this.stripeApiKey = StripeApiKey();
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

  render() {
    return (
      <div className="payment-details">
        <Header showBackNav={true}>
          <span className="header-title">{T.translate('paymentDetails.header')}</span>
        </Header>
        <div className="kvass-widget__content-body">
          <Spinner show={this.state.isLoading}></Spinner>
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
              <button className="kvass-widget__primary-button" onClick={() => Actions.onNextNavigation()}>{T.translate('paymentDetails.pay')}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentDetails;
