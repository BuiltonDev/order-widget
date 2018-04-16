import React from 'react'
import Reflux from 'reflux'
import TimePicker from 'react-times';
import T from 'src/utils/i18n';
import Actions from 'src/reflux/Actions';
import DeliveryStore from 'src/reflux/DeliveryStore';

class TimePickerWrapper extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = DeliveryStore;
    this.storeKeys = ['deliveryTime'];
  }

  render() {
    return (
      <TimePicker time={this.state.deliveryTime} draggable={false} onTimeChange={(time) => Actions.onTimeChange(time)} theme="classic"/>
    );
  }
}

export default TimePickerWrapper;
