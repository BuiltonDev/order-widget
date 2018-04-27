import Reflux from 'reflux';
import moment from 'moment';
import cloneDeep from 'lodash.clonedeep';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import parseLocation from 'src/utils/parseLocation';
import parseDeliveryTime from 'src/utils/parseDeliveryTime';
import Actions from './Actions';

const INITIAL_STATE = {
  deliveryDate: null, // Delivery allowed next day
  deliveryTime: null,
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

class DeliveryStore extends Reflux.Store {
  constructor() {
    super();
    const deliveryDate = moment().add(1, 'day');
    const deliveryTime = moment().startOf('hour').format('hh:mm').toString();
    this.state = {
      ...cloneDeep(INITIAL_STATE),
      deliveryDate,
      deliveryTime,
      parsedDeliveryTime: parseDeliveryTime(deliveryTime, deliveryDate)
    };
    this.listenables = Actions;
  }

  onDeliveryReset() {
    const deliveryDate = moment().add(1, 'day');
    const deliveryTime = moment().startOf('hour').format('hh:mm').toString();
    this.setState({
      ...cloneDeep(INITIAL_STATE),
      deliveryDate,
      deliveryTime,
      parsedDeliveryTime: parseDeliveryTime(deliveryTime, deliveryDate)
    });
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
        Actions.onMessage({isError: true});
      });
  }

  onAdditionalDetailsChange(deliveryAdditional) {
    this.setState({deliveryAdditional});
  }
}

export default DeliveryStore;
