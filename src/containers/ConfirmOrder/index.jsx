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
    this.storeKeys = ['products', 'deliveryDate', 'deliveryTime', 'deliveryAddress', 'deliveryAdditional', 'paymentMethod'];
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

    const orderPayload = {
      items: this.state.products.map((product) => {
        return { product: product._id.$oid, quantity: product.count };
      }),
      delivery_address: this.deliveryAddress,
      delivery_time: this.deliveryDate.unix() // TODO Add delivery time to moment obj. to get correct time
    };

    console.log(orderPayload);

    this.sa.order().create({body: orderPayload}, (err, order, raw) => {
      if (err) {
        this.onError(err);
        return;
      }

      this.sa.order().pay({}, (err, payOrder, raw) => {
        if (err) {
          this.onError(err);
          return;
        }
        console.log('Order', order);
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
