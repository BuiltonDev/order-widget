import React from 'react';
import Reflux from 'reflux';
import {StripeProvider, Elements, CardElement, injectStripe} from 'react-stripe-elements';
import Header from 'src/components/Header';
import Actions from 'src/reflux/Actions';
import T from 'src/utils/i18n';
import {StripeApiKey} from 'src/utils';


class PaymentDetails extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stripeApiKey = StripeApiKey();
  }

  handleSubmit(event) {
    ev.preventDefault();
    this.props.stripe.createToken().then(payload => console.log(payload));
  }

  handleChange(event) {
    console.log(event);
  }

  renderStripeCheckout() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement onChange={this.handleChange}/>
      </form>
    );
  }

  render() {
    return (
      <div className="payment-details">
        <Header showBackNav={true}>
          <span className="header-title">{T.translate('paymentDetails.header')}</span>
        </Header>
        <div className="kvass-widget__content-body">
          <div className="content">
            <div className="padding-container">
              <StripeProvider apiKey={this.stripeApiKey}>
                <Elements>
                  {this.renderStripeCheckout()}
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
