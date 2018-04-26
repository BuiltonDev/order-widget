import React from 'react';
import Reflux from 'reflux';
import moment from 'moment';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Spinner from 'src/components/Spinner';
import Actions from 'src/reflux/Actions';
import T from 'src/utils/i18n';
import {ShareActor} from 'src/utils';
import UserStore from 'src/reflux/UserStore';
import ProductStore from 'src/reflux/ProductStore';
import DeliveryStore from 'src/reflux/DeliveryStore';
import PaymentStore from 'src/reflux/PaymentStore';
import EditIcon from 'src/components/SvgIcons/EditIcon';
import parseCreditCard from 'src/utils/parseCreditCard';

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

    this.sa = ShareActor();
    this.createOrder = this.createOrder.bind(this);
    this.onError = this.onError.bind(this);
  }

  onError(error) {
    console.log(error);
    this.setState({isLoading: false});
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
    const {
      firstName = '', lastName = '', phoneNumber = '', totalCount = '', totalSum = '', parsedDeliveryTime = '',
      deliveryAddress = '', deliveryAdditional = '', selectedPaymentMethod = ''} = this.state;

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
                <div className="step">
                  <p className="step__label">{T.translate('basket.header')}</p>
                  <div onClick={() => Actions.onNavigateTo(1)} className="step__items">
                    <span>{totalCount}x {T.translate('confirm.products')}</span>
                    <span>{T.translate('confirm.totalPrice')} {totalSum}</span>
                    <EditIcon className="svg-icon--primary edit" />
                  </div>
                </div>

                <div className="step">
                  <p className="step__label">{T.translate('userDetails.header')}</p>
                  <div onClick={() => Actions.onNavigateTo(2)} className="step__items">
                    <span>{firstName} {lastName}</span>
                    <span>{phoneNumber}</span>
                    <EditIcon className="svg-icon--primary edit" />
                  </div>
                </div>

                <div className="step">
                  <p className="step__label">{T.translate('deliveryDetails.header')}</p>
                  <div onClick={() => Actions.onNavigateTo(3)} className="step__items">
                    <span>{deliveryAddress}</span>
                    <span>{deliveryTimeFormatted.toString()}</span>
                    <span>{deliveryAdditional ? T.translate('confirm.note') : ''}</span>
                    <span>{deliveryAdditional}</span>
                    <EditIcon className="svg-icon--primary edit" />
                  </div>
                </div>

                <div className="step">
                  <p className="step__label">{T.translate('paymentDetails.header')}</p>
                  <div onClick={() => Actions.onNavigateTo(4)} className="step__items">
                    <span>{parseCreditCard(selectedPaymentMethod.card)}</span>
                    <EditIcon className="svg-icon--primary edit" />
                  </div>
                </div>

                <span className="step-list__note">{T.translate('confirm.editNote')}</span>
            </div>
          </div>
          <Footer>
            <button className="kvass-widget__primary-button" onClick={this.createOrder}>{T.translate('global.confirm')}</button>
          </Footer>          
        </div>
      </div>
    );
  }
}

export default ConfirmOrder;
