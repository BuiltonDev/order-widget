import React from 'react';
import Reflux from 'reflux';
import 'react-dates/initialize';

import SingleDatePicker from 'react-dates/lib/components/SingleDatePicker';
import Actions from 'src/reflux/Actions';
import DeliveryStore from 'src/reflux/DeliveryStore';

class DayPickerWrapper extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = DeliveryStore;
    this.storeKeys = ['deliveryDate'];

    this.state = {
      focused: false
    };
  }

  onFocusChange({focused}) {
    this.setState({focused});
  }

  render() {
    const {deliveryDate, focused} = this.state;
    return (
      <SingleDatePicker
        numberOfMonths={1}
        date={deliveryDate}
        focused={focused}
        onDateChange={
          date => Actions.onDateChange(date)
        }
        onFocusChange={this.onFocusChange}
      />
    );
  }
}

export default DayPickerWrapper;
