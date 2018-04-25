import Reflux from 'reflux';
import moment from 'moment';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import parseLocation from 'src/utils/parseLocation';
import Actions from './Actions';

class DeliveryStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      deliveryDate: moment().add(1, 'day'), // Delivery allowed next day
      deliveryTime: moment().startOf('hour').format('hh:mm').toString(),
      deliveryAddress: '',
      deliveryGeo: [],
      retrievedGeo: false,
      deliveryAdditional: '',
      parsedDeliveryTime: null,
      parsedDeliveryAddress: {
        street_name: '',
        building: '',
        zip_code: '',
        city: '',
        country: ''
      }
    };
    this.listenables = Actions;
  }

  onDateChange(deliveryDate) {
    const [hours, minutes] = this.state.deliveryTime.split(':');
    const parsedDeliveryTime = deliveryDate.set({'hour': hours, 'minute': minutes, 'seconds': 0});
    this.setState({deliveryDate, parsedDeliveryTime});
  }

  onTimeChange(deliveryTime) {
    const [hours, minutes] = deliveryTime.split(':');
    const parsedDeliveryTime = this.state.deliveryDate.set({'hour': hours, 'minute': minutes, 'seconds': 0});
    this.setState({deliveryTime, parsedDeliveryTime});
  }

  onAddressChange(deliveryAddress) {
    this.setState({deliveryAddress, retrievedGeo: false});
  }

  onGetAddressFromGoogle(deliveryAddress) {
    if (this.state.retrievedGeo) return;
    this.setState({deliveryAddress});
    geocodeByAddress(deliveryAddress)
      .then((results) => {
        this.setState({
          parsedDeliveryAddress: {
            street_name: parseLocation(results[0], 'route'),
            building: parseLocation(results[0], 'street_number'),
            zip_code: parseLocation(results[0], 'postal_code'),
            city: parseLocation(results[0], 'postal_town'),
            country: parseLocation(results[0], 'country')
          }
        });
        return getLatLng(results[0]);
      })
      .then((latLng) => {
        this.setState({deliveryGeo: [latLng.lat, latLng.lng], retrievedGeo: true});
      })
      .catch(() => {
        // TODO Handle error
      });
  }

  onAdditionalDetailsChange(deliveryAdditional) {
    this.setState({deliveryAdditional});
  }
}

export default DeliveryStore;
