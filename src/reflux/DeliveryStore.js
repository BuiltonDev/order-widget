import Reflux from 'reflux';
import moment from 'moment';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import Actions from './Actions';
import parseLocation from 'src/utils/parseLocation';

class DeliveryStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      deliveryDate: moment(),
      deliveryTime: moment().startOf('hour').toString(),
      deliveryAddress: '',
      deliveryGeo: [],
      retrievedGeo: false,
      deliveryAdditional: '',
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
      .then(results => {
        this.setState({
          parsedDeliveryAddress: {
            street_name: parseLocation(results[0], 'route'),
            building: parseLocation(results[0], 'street_number'),
            zip_code: parseLocation(results[0], 'postal_code'),
            city: parseLocation(results[0], 'postal_town'),
            country: parseLocation(results[0], 'country')
          }
        });
        return getLatLng(results[0])
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
