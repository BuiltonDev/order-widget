import Reflux from 'reflux';
import moment from 'moment';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import Actions from './Actions';

class DeliveryStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      deliveryDate: moment(),
      deliveryTime: moment().startOf('hour').toString(),
      deliveryAddress: '',
      lat: 0,
      lng: 0,
      retrievedGeo: false,
      deliveryAdditional: ''
    };
    this.listenables = Actions;
  }

  onDateChange(deliveryDate) {
    this.setState({deliveryDate});
  }

  onTimeChange(deliveryTime) {
    this.setState({deliveryTime});
  }

  onAddressChange(deliveryAddress) {
    this.setState({deliveryAddress, retrievedGeo: false});
  }

  onGetAddressFromGoogle(deliveryAddress) {
    if (this.state.retrievedGeo) return;
    this.setState({deliveryAddress});
    geocodeByAddress(deliveryAddress)
      .then(results => getLatLng(results[0]))
      .then((latLng) => {
        this.setState({...latLng, retrievedGeo: true});
      })
      .catch(error => console.error('Error', error));
  }

  onAdditionalDetailsChange(deliveryAdditional) {
    this.setState({deliveryAdditional});
  }
}

export default DeliveryStore;
