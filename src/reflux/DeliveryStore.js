import Reflux from 'reflux';
import moment from 'moment';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import parseLocation from 'src/utils/parseLocation';
import parseDeliveryTime from 'src/utils/parseDeliveryTime';
import Actions from './Actions';

class DeliveryStore extends Reflux.Store {
  constructor() {
    const deliveryDate = moment().add(1, 'day');
    const deliveryTime = moment().startOf('hour').format('hh:mm').toString();
    super();
    this.state = {
      deliveryDate, // Delivery allowed next day
      deliveryTime,
      deliveryAddress: '',
      deliveryGeo: [],
      retrievedGeo: false,
      deliveryAdditional: '',
      parsedDeliveryTime: parseDeliveryTime(deliveryTime, deliveryDate),
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
    const parsed = parseDeliveryTime(this.state.deliveryTime, deliveryDate);
    this.setState({deliveryDate, parsedDeliveryTime: parsed});
  }

  onTimeChange(deliveryTime) {
    const parsed = parseDeliveryTime(deliveryTime, this.state.deliveryDate);
    this.setState({deliveryTime, parsedDeliveryTime: parsed});
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
