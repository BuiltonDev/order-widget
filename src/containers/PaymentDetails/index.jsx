import React from 'react';
import Reflux from 'reflux';
import {StripeProvider, Elements} from 'react-stripe-elements';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Spinner from 'src/components/Spinner';
import PaymentForm from 'src/components/PaymentForm';
import Actions from 'src/reflux/Actions';
import T from 'src/utils/i18n';
import Config from 'src/utils/Config';
import PaymentStore from 'src/reflux/PaymentStore';
import UserStore from 'src/reflux/UserStore';
import Kvass from '@kvass.ai/core-sdk';
import utils from 'src/utils';
import Animate from '../../utils/animate';

class PaymentDetails extends Reflux.Component {
  constructor(props) {
    super(props);
    this.config = Config();
    this.kvass = new Kvass();
    this.animation = new Animate();

    this.stores = [PaymentStore, UserStore];
    this.state = {
      isLoading: true,
      stripe: null // stripe instance
    };
    this.storeKeys = ['stripeToken', 'apiUser', 'selectedPaymentMethod', 'userPaymentMethods'];

    this.setPaymentMethod = this.setPaymentMethod.bind(this);
    this.onPaymentMethodChange = this.onPaymentMethodChange.bind(this);
    this.onStripePaymentAdded = this.onStripePaymentAdded.bind(this);
  }

  componentDidMount() {
    if (window.Stripe) {
      this.setState({stripe: this.config.stripeConfig});
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({stripe: this.config.stripeConfig});
      });
    }

    // Retrieve payment methods
    this.kvass.paymentMethod().getAll({}, (err, PaymentMethods, raw) => {
      if (err) {
        Actions.onMessage({isError: true});
        this.setState({isLoading: false});
        return;
      }

      // Set default selected payment method to users default
      const defaultPaymentMethod = this.state.apiUser.default_payment_method;
      if (defaultPaymentMethod) {
        this.setPaymentMethod(defaultPaymentMethod.$oid, PaymentMethods);
      }
      Actions.onAddUserPaymentMethods(PaymentMethods);
      this.setState({isLoading: false});
    });
  }

  componentDidUpdate() {
    this.animation.animateInViewTransition();
  }

  setPaymentMethod(id, paymentMethods) {
    let foundPaymentMethod = null;
    paymentMethods.forEach((paymentMethod) => {
      if (paymentMethod.id === id) foundPaymentMethod = paymentMethod;
    });
    Actions.onSelectPaymentMethod(foundPaymentMethod);
  }

  onPaymentMethodChange(event) {
    this.setPaymentMethod(event.target.value, this.state.userPaymentMethods);
  }

  onStripePaymentAdded({isLoading = false}) {
    this.setState({isLoading});
  }

  renderPaymentMethodList() {
    const {userPaymentMethods, apiUser, selectedPaymentMethod} = this.state;
    if (!userPaymentMethods || !userPaymentMethods.length) return;

    const children = userPaymentMethods.map((paymentMethod) => {
      return (
        <option key={paymentMethod.id} value={paymentMethod.id}>
          {utils.parseCreditCard(paymentMethod.card)}
        </option>
      );
    });
    return (
      <div className='in-page-transition'>
        <p>{T.translate('paymentDetails.usePrevious')}</p>
        <select className="payment-details__list" name="paymentMethods" value={this.state.selectedPaymentMethod.id} onChange={this.onPaymentMethodChange}>
          {children}
        </select>
      </div>
    );
  }

  render() {
    const {isLoading, stripeToken, selectedPaymentMethod} = this.state;
    return (
      <div className="payment-details">
        <Header showBackNav={true}>
          <span className="header-title">{T.translate('paymentDetails.header')}</span>
        </Header>
        <div className="kvass-widget__content-body">
          <Spinner show={isLoading}></Spinner>
          <div className="content">
            <div className="padding-container">
              {this.renderPaymentMethodList()}
              <div className='in-page-transition'>
                <p>{T.translate('paymentDetails.useNew')}</p>
                <StripeProvider apiKey={this.config.stripeConfig}>
                  <Elements>
                    <PaymentForm onStripePaymentAdded={this.onStripePaymentAdded}/>
                  </Elements>
                </StripeProvider>
              </div>
            </div>
          </div>
          <Footer>
            <button className="kvass-widget__primary-button" disabled={!selectedPaymentMethod} onClick={() => Actions.onNextNavigation()}>{T.translate('paymentDetails.pay')}</button>
          </Footer>
        </div>
      </div>
    );
  }
}

export default PaymentDetails;
