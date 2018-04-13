import React, {Component} from 'react'
import TimePicker from 'react-times';
import T from 'src/utils/i18n';

class TimePickerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: ''
    };
    this.onTimeChange = this.onTimeChange.bind(this);
  }

  onTimeChange(time) {
    this.setState({time});
  }

  render() {
    return (
      <TimePicker time={this.state.time} draggable={false} onTimeChange={this.onTimeChange} theme="classic"/>
    );
  }
}

export default TimePickerWrapper;
