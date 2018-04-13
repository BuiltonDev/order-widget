import React, {Component} from 'react'
import {SingleDatePicker} from 'react-dates';
import moment from 'moment';
import T from 'src/utils/i18n';

class DayPickerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      date: moment(),
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDateChange(date) {
    this.setState({date});
  }

  onFocusChange({focused}) {
    console.log(focused);
    // Force the focused states to always be truthy so that date is always selectable
    this.setState({focused});
  }

  render() {
    const {date, focused} = this.state;
    return (
      <SingleDatePicker numberOfMonths={1} date={date} focused={focused} onDateChange={this.onDateChange} onFocusChange={this.onFocusChange}/>
    );
  }
}

export default DayPickerWrapper;
