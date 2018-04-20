import React from 'react';
import Reflux from 'reflux';
import {DebounceInput} from 'react-debounce-input';
import Header from 'src/components/Header';
import PlaceAutoCompleteWrapper from 'src/components/PlaceAutoCompleteWrapper';
import TimePickerWrapper from 'src/components/TimePickerWrapper';
import DayPickerWrapper from 'src/components/DayPickerWrapper';
import Actions from 'src/reflux/Actions';
import DeliveryStore from 'src/reflux/DeliveryStore';
import T from 'src/utils/i18n';

class DeliveryDetails extends Reflux.Component {
  constructor(props) {
    super(props);

    this.store = DeliveryStore;
    this.storeKeys = ['deliveryAdditional'];
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
              <p>{T.translate('deliveryDetails.deliveryDetails')}</p>
              <PlaceAutoCompleteWrapper />
              <p>{T.translate('deliveryDetails.dateDetails')}</p>
              <DayPickerWrapper />
              <p>{T.translate('deliveryDetails.timeDetails')}</p>
              <TimePickerWrapper />
              <p>{T.translate('deliveryDetails.additionalDetails')}</p>
              <textarea className="delivery-details__additional" value={this.state.deliveryAdditional} onChange={(evt) => Actions.onAdditionalDetailsChange(evt.target.value)} maxLength="250"/>
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
