import React from 'react';
import Reflux from 'reflux';
import {DebounceInput} from 'react-debounce-input';
import Header from 'src/components/Header';
import Actions from 'src/reflux/Actions';
import DeliveryStore from 'src/reflux/DeliveryStore';
import ProductStore from 'src/reflux/ProductStore';
import UserStore from 'src/reflux/UserStore';
import T from 'src/utils/i18n';

class Receipt extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [DeliveryStore, ProductStore, UserStore];
    this.storeKeys = ['firstName', 'lastName', 'phoneNumber', 'products', 'totalSum', 'deliveryAddress', 'deliveryTime', 'deliveryDate', 'deliveryAdditional'];
  }

  renderReceiptItem(label, items = []) {
    console.log(items);
    let multipleClassName = null;
    if (items.length > 1) multipleClassName = 'receipt-item__multiple';

    const children = items.map((item, idx) => (<span key={idx}>{item}</span>));

    return (
      <li key={label} className="receipt-item">
        <div>
          <span>{label}:</span>
        </div>
        <div className={multipleClassName}>
          {children}
        </div>
      </li>
    );
  }

  render() {
    let productArray = [];
    Object.entries(this.state.products).forEach(([key, value]) => {
      if (value) productArray.push(`${value.count}x ${value.item.name}`);
    });

    return (
      <div className="receipt">
        <Header showBackNav={true}>
          <span className="header-title">{T.translate('receipt.header')}</span>
        </Header>
        <div className="kvass-widget__content-body">
          <div className="receipt">
            <div className="padding-container">
              <div className="receipt-summary">
                <ul>
                  {this.renderReceiptItem('Name', [this.state.firstName + ' ' + this.state.lastName])}
                  {this.renderReceiptItem('Phone number', [this.state.phoneNumber])}
                  {/*this.renderReceiptItem('Order', [this.state.orderId])*/}
                  {this.renderReceiptItem('Product(s)', productArray)}
                  {this.renderReceiptItem('Total price', [this.state.totalSum])}
                  {this.renderReceiptItem('Delivery', [this.state.deliveryAddress, `${this.state.deliveryDate.format('DD/MM YYYY')}, ${this.state.deliveryTime}`])}
                  {this.state.deliveryAdditional ? this.renderReceiptItem('Delivery notes' , [this.state.deliveryAdditional]) : null}
                </ul>
              </div>
            </div>
          </div>
          <div className="kvass-widget__content-footer">
            <div className="footer-content">
              <button className="kvass-widget__primary-button" onClick={() => window.KvassOrdering.close()}>{T.translate('global.last')}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Receipt;
