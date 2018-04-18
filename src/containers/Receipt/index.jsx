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
      totalPrice: '200'
    };
  }

  renderReceiptItem(label, items = []) {
    let multipleClassName = null;
    if (items.length > 1) multipleClassName = 'receipt-item__multiple';

    const children = items.map((item) => (<span className={multipleClassName}>{item}</span>));

    return (
      <li className="receipt-item">
        <div>
          <span>Name:</span>
        </div>
        <div>
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
                  <li className="receipt-item">
                    <div>
                      <span>Name:</span>
                    </div>
                    <div>
                      <span>{this.state.first_name} {this.state.last_name}</span>
                    </div>
                  </li>
                  <li className="receipt-item">
                    <div>
                      <span>Phone number:</span>
                    </div>
                    <div>
                      <span>{this.state.phone_number}</span>
                    </div>
                  </li>
                  <li className="receipt-item">
                    <div>
                      <span>Order:</span>
                    </div>
                    <div>
                      <span>{this.state.orderId}</span>
                    </div>
                  </li>
                  <li className="receipt-item">
                    <div>
                      <span>Product(s):</span>
                    </div>
                    <div className="receipt-item__multiple">
                      <span>2x Example Product</span>
                      <span>1x Example Product2</span>
                    </div>
                  </li>
                  <li className="receipt-item">
                    <div>
                      <span>Total price:</span>
                    </div>
                    <div>
                      <span>{this.state.totalPrice}</span>
                    </div>
                  </li>
                  <li className="receipt-item">
                    <div>
                      <span>Delivery:</span>
                    </div>
                    <div className="receipt-item__multiple">
                      <span>Augestadveien 14A, 1413 Tårnåsen</span>
                      <span>20/4/2018 18:00</span>
                    </div>
                  </li>
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
