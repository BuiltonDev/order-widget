import React from 'react';
import Reflux from 'reflux';
import {DebounceInput} from 'react-debounce-input';
import Header from 'src/components/Header';
import Actions from 'src/reflux/Actions';
import T from 'src/utils/i18n';

class DeliveryDetails extends Reflux.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="delivery-details">
        <Header showBackNav={true}>
          <span className="header-title">{T.translate('deliveryDetails.header')}</span>
        </Header>
        <div className="kvass-widget__content-body">
          <div className="content">
            <div className="padding-container">

            </div>
          </div>
          <div className="kvass-widget__content-footer">
            <div className="footer-content">
              <button className="kvass-widget__primary-button" onClick={() => Actions.onNextNavigation()}>{T.translate('global.next')}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeliveryDetails;
