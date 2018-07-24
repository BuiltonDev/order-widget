import React from 'react';
import Reflux from 'reflux';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import DeliveryStore from 'src/reflux/DeliveryStore';
import ProductStore from 'src/reflux/ProductStore';
import UserStore from 'src/reflux/UserStore';
import OrderStore from 'src/reflux/OrderStore';
import BasketList from 'src/components/BasketList';
import T from 'src/utils/i18n';
import utils from 'src/utils';
import Animate from '../../utils/animate';

class Receipt extends Reflux.Component {
  static renderBasketReceiptItem(label, products) {
    return (
      <React.Fragment>
        <li key={label} className="receipt-item in-page-transition">
          <div>
            <span className="label">{label}:</span>
          </div>
        </li>
        <li key={`${label}-item`} className="receipt-item receipt-item__basket in-page-transition">
          <div className="receipt-item__multiple">
            <BasketList className="receipt-basket" products={products} isCountChangeEnabled={false} onOneLine={true}/>
          </div>
        </li>
      </React.Fragment>
    );
  }

  static renderReceiptItem(label, items = []) {
    let multipleClassName = null;
    if (items.length > 1) multipleClassName = 'receipt-item__multiple';

    const children = items.map((item, idx) => (<span key={idx}>{item}</span>));

    return (
      <li key={label} className="receipt-item in-page-transition">
        <div>
          <span className="label">{label}:</span>
        </div>
        <div className={multipleClassName}>
          {children}
        </div>
      </li>
    );
  }

  static renderHeader() {
    return (
      <Header showBackNav={false}>
        <span className="header-title">{T.translate('receipt.header')}</span>
      </Header>
    );
  }

  static renderFooter() {
    return (
      <Footer>
        <button
          className="kvass-widget__primary-button"
          onClick={() => window.KvassOrdering.close()}
        >
          {T.translate('global.last')}
        </button>
      </Footer>
    );
  }

  constructor(props) {
    super(props);
    this.stores = [DeliveryStore, ProductStore, UserStore, OrderStore];
    this.animation = new Animate();
    this.storeKeys = ['firstName', 'lastName', 'phoneNumber', 'products', 'totalSum', 'deliveryAddress', 'parsedDeliveryTime', 'deliveryAdditional', 'order'];

    this.renderBody = this.renderBody.bind(this);
  }

  componentDidMount() {
    this.animation.animateInViewTransition();
  }

  renderBody() {
    const currency = utils.getCurrency(this.state.products);
    return (
      <div className="content">
        <div className="padding-container">
          <div className="receipt-summary">
            <ul>
              {this.constructor.renderReceiptItem(T.translate('receipt.nameLabel'), [`${this.state.firstName} ${this.state.lastName}`])}
              {this.constructor.renderReceiptItem(T.translate('receipt.phoneNumberLabel'), [this.state.phoneNumber])}
              {this.constructor.renderReceiptItem(T.translate('receipt.orderId'), [this.state.order.human_id])}
              {/*this.constructor.renderReceiptItem('Order', [this.state.orderId])*/}
              {this.constructor.renderBasketReceiptItem(T.translate('receipt.productsLabel'), this.state.products)}
              {this.constructor.renderReceiptItem(T.translate('receipt.priceLabel'), [`${utils.roundNumber(this.state.totalSum, 2)} ${currency}`])}
              {this.constructor.renderReceiptItem(T.translate('receipt.deliveryLabel'), [this.state.deliveryAddress, this.state.parsedDeliveryTime.format('LLL')])}
              {this.state.deliveryAdditional ? this.constructor.renderReceiptItem(T.translate('receipt.deliveryAddLabel'), [this.state.deliveryAdditional]) : null}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="receipt">
        {this.constructor.renderHeader()}
        <div className="kvass-widget__content-body">
          {this.renderBody()}
          {this.constructor.renderFooter()}
        </div>
      </div>
    );
  }
}

export default Receipt;
