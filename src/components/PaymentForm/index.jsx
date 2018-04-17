import React from 'react'
import Reflux from 'reflux'
import {CardElement, injectStripe} from 'react-stripe-elements';
import T from 'src/utils/i18n';
import Actions from 'src/reflux/Actions';
import DeliveryStore from 'src/reflux/DeliveryStore';

class PaymentForm extends Reflux.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(event) {
    ev.preventDefault();
    this.props.stripe.createToken({name: 'Jenny Rosen'}).then(payload => {
      console.log(payload)
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement />
      </form>
    );
  }
}
// Use Higher-Order Component (HOC)
export default injectStripe(PaymentForm);
