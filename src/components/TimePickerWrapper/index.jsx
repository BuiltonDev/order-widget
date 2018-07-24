import React from 'react';
import Reflux from 'reflux';
import * as utils from 'react-times/lib/utils/const_value';
import TimePicker from 'react-times';
import Actions from 'src/reflux/Actions';
import DeliveryStore from 'src/reflux/DeliveryStore';

// Overwrite react-times default 30 min interal to 1h intervals
utils.TIMES_24_MODE = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00'
];

class TimePickerWrapper extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = DeliveryStore;
    this.storeKeys = ['deliveryTime'];
  }

  render() {
    return (
      <TimePicker
        time={this.state.deliveryTime}
        draggable={false}
        onTimeChange={time => Actions.onTimeChange(time)}
        theme="classic"
      />
    );
  }
}

export default TimePickerWrapper;
