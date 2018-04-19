import React from 'react';
import Reflux from 'reflux';
import {DebounceInput} from 'react-debounce-input';
import Header from 'src/components/Header';
import Actions from 'src/reflux/Actions';
import T from 'src/utils/i18n';

class Receipt extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: 'James',
      last_name: 'Bond',
      phone_number: '+47 97180329',
      orderId: 'ERD232',
      totalPrice: '200',
      products: [
        '2x Example Product',
        '1x Example Product2'
      ],
      delivery: [
        'Augestadveien 14A, 1413 Tårnåsen',
        '20/4/2018 18:00'
      ]
    };
  }

  renderReceiptItem(label, items = []) {
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
                  {this.renderReceiptItem('Name', [this.state.first_name + ' ' + this.state.last_name])}
                  {this.renderReceiptItem('Phone number', [this.state.phone_number])}
                  {this.renderReceiptItem('Order', [this.state.orderId])}
                  {this.renderReceiptItem('Product(s)', this.state.products)}
                  {this.renderReceiptItem('Total price', [this.state.totalPrice])}
                  {this.renderReceiptItem('Delivery', this.state.delivery)}
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
