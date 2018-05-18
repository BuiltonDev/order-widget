import React from 'react';
import Reflux from 'reflux';
import {DebounceInput} from 'react-debounce-input';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Actions from 'src/reflux/Actions';
import DeliveryStore from 'src/reflux/DeliveryStore';
import ProductStore from 'src/reflux/ProductStore';
import UserStore from 'src/reflux/UserStore';
import BasketList from 'src/components/BasketList';
import T from 'src/utils/i18n';
import getCurrency from 'src/utils/getCurrency';

class Receipt extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [DeliveryStore, ProductStore, UserStore];
    this.storeKeys = ['firstName', 'lastName', 'phoneNumber', 'products', 'totalSum', 'deliveryAddress', 'parsedDeliveryTime', 'deliveryAdditional'];
  }

  renderReceiptItem(label, items = []) {
    let multipleClassName = null;
    if (items.length > 1) multipleClassName = 'receipt-item__multiple';

    const children = items.map((item, idx) => (<span key={idx}>{item}</span>));

    return (
      <li key={label} className="receipt-item">
        <div>
          <span className="label">{label}:</span>
        </div>
        <div className={multipleClassName}>
          {children}
        </div>
      </li>
    );
  }

  renderBasketReceiptItem(label, products) {
    return (
      <>
        <li key={label} className="receipt-item">
          <div>
            <span className="label">{label}:</span>
          </div>
        </li>
        <li key={`${label}-item`} className="receipt-item receipt-item__basket">
          <div className="receipt-item__multiple">
            <BasketList className="receipt-basket" products={products} isCountChangeEnabled={false} onOneLine={true}/>
          </div>
        </li>
      </>
    );
  }

  render() {
    const currency = getCurrency(this.state.products);
    return (
      <div className="receipt">
        <Header showBackNav={false}>
          <span className="header-title">{T.translate('receipt.header')}</span>
        </Header>
        <div className="kvass-widget__content-body">
          <div className="receipt">
            <div className="padding-container">
              <div className="receipt-summary">
                <ul>
                  {this.renderReceiptItem(T.translate('receipt.nameLabel'), [this.state.firstName + ' ' + this.state.lastName])}
                  {this.renderReceiptItem(T.translate('receipt.phoneNumberLabel'), [this.state.phoneNumber])}
                  {/*this.renderReceiptItem('Order', [this.state.orderId])*/}
                  {this.renderBasketReceiptItem(T.translate('receipt.productsLabel'), this.state.products)}
                  {this.renderReceiptItem(T.translate('receipt.priceLabel'), [this.state.totalSum + ' ' + currency])}
                  {this.renderReceiptItem(T.translate('receipt.deliveryLabel'), [this.state.deliveryAddress, this.state.parsedDeliveryTime.format('LLL')])}
                  {this.state.deliveryAdditional ? this.renderReceiptItem(T.translate('receipt.deliveryAddLabel') , [this.state.deliveryAdditional]) : null}
                </ul>
              </div>
            </div>
          </div>
          <Footer>
            <button className="kvass-widget__primary-button" onClick={() => window.KvassOrdering.close()}>{T.translate('global.last')}</button>
          </Footer>
        </div>
      </div>
    );
  }
}

export default Receipt;
