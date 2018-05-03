import React from 'react';
import Reflux from 'reflux';
import {DebounceInput} from 'react-debounce-input';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
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
    this.storeKeys = ['deliveryAdditional', 'setDate', 'setTime'];
  }

  render() {
    const {deliveryAdditional, setDate, setTime} = this.state;
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
              <textarea className="delivery-details__additional" value={deliveryAdditional} onChange={(evt) => Actions.onAdditionalDetailsChange(evt.target.value)} maxLength="250"/>
            </div>
          </div>
          <Footer>
            <button className="kvass-widget__primary-button" disabled={!setDate || !setTime} onClick={() => Actions.onNextNavigation()}>{T.translate('global.next')}</button>
          </Footer>
        </div>
      </div>
    );
  }
}

export default DeliveryDetails;
