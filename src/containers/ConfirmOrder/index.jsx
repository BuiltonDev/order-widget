import React from 'react';
import Reflux from 'reflux';
import moment from 'moment';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Spinner from 'src/components/Spinner';
import Actions from 'src/reflux/Actions';
import T from 'src/utils/i18n';
import Kvass from '@kvass.ai/core-sdk';
import UserStore from 'src/reflux/UserStore';
import ProductStore from 'src/reflux/ProductStore';
import DeliveryStore from 'src/reflux/DeliveryStore';
import PaymentStore from 'src/reflux/PaymentStore';
import utils from 'src/utils';
import Animate from '../../utils/animate';

class ConfirmOrder extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [UserStore, ProductStore, DeliveryStore, PaymentStore];
    this.storeKeys = ['firstName', 'lastName', 'phoneNumber', 'products', 'totalCount', 'totalSum', 'parsedDeliveryTime',
    'parsedDeliveryAddress', 'deliveryAddress', 'deliveryGeo', 'deliveryAdditional', 'selectedPaymentMethod'];

    this.state = {
      isLoading: false,
      processedOrder: false
    };

    this.kvass = new Kvass();
    this.animation = new Animate();
    this.createOrder = this.createOrder.bind(this);
  }

  componentDidMount() {
    this.animation.animateInViewTransition();
  }

  // POST /order {items: [{...product, quantity}], payment_method: payment_method_id}
  // POST /order/{ID}/pay {}
  createOrder() {
    this.setState({isLoading: true});
    let productItems = [];
    let currency;

    Object.entries(this.state.products).forEach(([key, value]) => {
      if (!value) return;
      if (!currency) currency = value.item.currency;
      productItems.push({product: value.item._id.$oid, quantity: value.count});
    });

    const orderPayload = {
      currency, // TODO better way here. We need a way of setting one global currency used for this order
      items: productItems,
      delivery_address: {...this.state.parsedDeliveryAddress, geo: this.state.deliveryGeo},
      delivery_time: this.state.parsedDeliveryTime.unix()
    };

    this.kvass.order().create({body: orderPayload}, (err, Order, raw) => {
      if (err) {
        Actions.onMessage({isError: true});
        this.setState({isLoading: false});
        return;
      }

      const paymentPayload = {
        orders: [Order.id],
        payment_method: this.state.selectedPaymentMethod.id
      };

      this.kvass.payment().create({body: paymentPayload}, (err, PayOrder, raw) => {
        if (err) {
          Actions.onMessage({isError: true});
          this.setState({isLoading: false});
          return;
        }

        this.setState({isLoading: false, processedOrder: true});
        Actions.onNextNavigation();
      });
    });
  }

  render() {
    const {
      firstName = '', lastName = '', phoneNumber = '', totalCount = '', totalSum = '', parsedDeliveryTime = '',
      deliveryAddress = '', deliveryAdditional = '', selectedPaymentMethod = ''} = this.state;

      let currency = utils.getCurrency(this.state.products);
      let deliveryTimeFormatted = moment.isMoment(parsedDeliveryTime) ? parsedDeliveryTime.format('LLL') : '';

    return (
      <div className="confirm-order">
        <Header showBackNav={true}>
          <span className="header-title">{T.translate('confirm.header')}</span>
        </Header>
        <div className="kvass-widget__content-body">
          <Spinner show={this.state.isLoading}></Spinner>
          <div className="content">
            <div className="step-list">
                <div className="step in-page-transition">
                  <div className="step-header">
                    <p className="step__label">{T.translate('userDetails.header')}</p>
                  </div>
                  <div onClick={() => Actions.onNavigateTo(2)} className="step__items column">
                    <span>{firstName} {lastName}</span>
                    <span>{phoneNumber}</span>
                  </div>
                </div>

                <div className="step in-page-transition">
                  <div className="step-header">
                    <p className="step__label">{T.translate('deliveryDetails.header')}</p>
                  </div>
                  <div onClick={() => Actions.onNavigateTo(3)} className="step__items column">
                    <span>{deliveryAddress}</span>
                    <span>{deliveryTimeFormatted.toString()}</span>
                    <span>{deliveryAdditional ? T.translate('confirm.note') : ''}</span>
                    <span>{deliveryAdditional}</span>
                  </div>
                </div>

                <div className="step in-page-transition">
                  <div className="step-header">
                    <p className="step__label">{T.translate('paymentDetails.header')}</p>
                  </div>
                  <div onClick={() => Actions.onNavigateTo(4)} className="step__items column">
                    <span>{utils.parseCreditCard(selectedPaymentMethod.card)}</span>
                  </div>
                </div>

                <div className="step in-page-transition">
                  <div className="step-header">
                    <p className="step__label">{T.translate('basket.header')}</p>
                    <p className="step__label">{T.translate('confirm.totalPrice')} </p>
                  </div>
                  <div onClick={() => Actions.onNavigateTo(1)} className="step__items row">
                    <span>{totalCount}x {T.translate('confirm.products')}</span>
                    <span>{totalSum} {currency}</span>
                  </div>
                </div>
            </div>
          </div>
          <Footer>
            <span className="step-list__note">{T.translate('confirm.editNote')}</span>
            <button className="kvass-widget__primary-button" onClick={this.createOrder}>{T.translate('global.confirm')}</button>
          </Footer>
        </div>
      </div>
    );
  }
}

export default ConfirmOrder;
