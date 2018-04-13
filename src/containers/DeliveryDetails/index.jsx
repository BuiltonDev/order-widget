import React from 'react';
import Reflux from 'reflux';
import {DebounceInput} from 'react-debounce-input';
import Header from 'src/components/Header';
import PlaceAutoComplete from 'src/components/PlaceAutoComplete';
import TimePickerWrapper from 'src/components/TimePickerWrapper';
import DayPickerWrapper from 'src/components/DayPickerWrapper';
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
              <p>{T.translate('deliveryDetails.deliveryDetails')}</p>
              <PlaceAutoComplete />
              <p>{T.translate('deliveryDetails.timeDetails')}</p>
              <TimePickerWrapper /> <DayPickerWrapper />
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
