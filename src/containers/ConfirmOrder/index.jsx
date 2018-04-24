import React from 'react';
import Reflux from 'reflux';
import Header from 'src/components/Header';
import Spinner from 'src/components/Spinner';
import Actions from 'src/reflux/Actions';
import T from 'src/utils/i18n';
import {ShareActor} from 'src/utils';
import ProductStore from 'src/reflux/ProductStore';
import DeliveryStore from 'src/reflux/DeliveryStore';
import PaymentStore from 'src/reflux/PaymentStore';

class ConfirmOrder extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [ProductStore, DeliveryStore, PaymentStore];
    this.storeKeys = ['products', 'deliveryDate', 'deliveryTime', 'deliveryAddress', 'deliveryGeo', 'deliveryAdditional', 'selectedPaymentMethod'];
    this.state = {
      isLoading: false,
      processedOrder: false
    };

    this.sa = ShareActor();
    this.createOrder = this.createOrder.bind(this);
    this.onError = this.onError.bind(this);
  }

  onError(error) {
    console.log(error);
    this.setState({isLoading: false});
  }

  // POST /payment_method {payment_method: 'stripe', token: stripeToken}
  // POST /order {items: [{...product, quantity}], payment_method: payment_method_id}
  // POST /order/{ID}/pay {}
  createOrder() {
    this.setState({isLoading: true});
    let currency;
    const orderPayload = {
      items: Object.entries(this.state.products).map(([key, value]) => {
        if(!currency) currency = value.item.currency;
        return { product: value.item._id.$oid, quantity: value.count };
      }),
      delivery_address: {street_name: this.state.deliveryAddress, geo: this.state.deliveryGeo}, // TODO Get proper mapping of street_name, zip_code, city, country
      delivery_time: this.state.deliveryDate.unix() // TODO Add delivery time to moment obj. to get correct time,
    };
    orderPayload.currency = currency; // TODO better way here. We need a way of setting one global currency used for this order

    this.sa.order().create({body: orderPayload}, (err, Order, raw) => {
      if (err) {
        this.onError(err);
        return;
      }

      const paymentPayload = {
        orders: [Order.id],
        payment_method: this.state.selectedPaymentMethod.id
      };

      this.sa.payment().create({body: paymentPayload}, (err, PayOrder, raw) => {
        if (err) {
          this.onError(err);
          return;
        }

        this.setState({isLoading: false, processedOrder: true});
        Actions.onNextNavigation();
      });
    });
  }

  render() {
    return (
      <div className="delivery-details">
        <Header showBackNav={true}>
          <span className="header-title">{T.translate('deliveryDetails.header')}</span>
        </Header>
        <div className="kvass-widget__content-body">
          <Spinner show={this.state.isLoading}></Spinner>
          <div className="content">
            <div className="padding-container">
              Confirm Order (temp page)
              {' '}
              {this.state.processedOrder ? 'SUCCESS' : 'PENDING'}
            </div>
          </div>
          <div className="kvass-widget__content-footer">
            <div className="footer-content">
              <button className="kvass-widget__primary-button" onClick={this.createOrder}>{T.translate('global.confirm')}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmOrder;
