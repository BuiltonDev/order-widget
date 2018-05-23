import Reflux from 'reflux';
import moment from 'moment';
import cloneDeep from 'lodash.clonedeep';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import utils from 'src/utils';
import Actions from './Actions';

const INITIAL_STATE = {
  deliveryDate: null, // Delivery allowed next day
  deliveryTime: null,
  deliveryAddress: '',
  deliveryGeo: [],
  retrievedGeo: false,
  setTime: false,
  setDate: false,
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

const nextDay = moment().add(1, 'day');
const startOfHour = moment().startOf('hour').format('hh:mm');

class DeliveryStore extends Reflux.Store {
  constructor() {
    super();
    const deliveryDate = nextDay.clone();
    const deliveryTime = startOfHour.toString();
    this.state = {
      ...cloneDeep(INITIAL_STATE),
      deliveryDate,
      deliveryTime,
      parsedDeliveryTime: utils.parseDeliveryTime(deliveryTime, deliveryDate)
    };
    this.listenables = Actions;
  }

  onDeliveryReset() {
    const deliveryDate = nextDay.clone();
    const deliveryTime = startOfHour.toString();
    this.setState({
      ...cloneDeep(INITIAL_STATE),
      deliveryDate,
      deliveryTime,
      parsedDeliveryTime: utils.parseDeliveryTime(deliveryTime, deliveryDate)
    });
  }

  onDateChange(deliveryDate) {
    const parsed = utils.parseDeliveryTime(this.state.deliveryTime, deliveryDate);
    this.setState({deliveryDate, parsedDeliveryTime: parsed, setDate: true});
  }

  onTimeChange(deliveryTime) {
    const parsed = utils.parseDeliveryTime(deliveryTime, this.state.deliveryDate);
    this.setState({deliveryTime, parsedDeliveryTime: parsed, setTime: true});
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
            street_name: utils.parseLocation(results[0], 'route'),
            building: utils.parseLocation(results[0], 'street_number'),
            zip_code: utils.parseLocation(results[0], 'postal_code'),
            city: utils.parseLocation(results[0], 'postal_town'),
            country: utils.parseLocation(results[0], 'country')
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
