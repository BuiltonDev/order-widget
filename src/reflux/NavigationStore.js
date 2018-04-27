import Reflux from 'reflux';
import cloneDeep from 'lodash.clonedeep';

// Containers
import ProductSearch from 'src/containers/ProductSearch';
import ProductBasket from 'src/containers/ProductBasket';
import UserDetails from 'src/containers/UserDetails';
import DeliveryDetails from 'src/containers/DeliveryDetails';
import PaymentDetails from 'src/containers/PaymentDetails';
import ConfirmOrder from 'src/containers/ConfirmOrder';
import Receipt from 'src/containers/Receipt';
import Actions from './Actions';

const INITIAL_STATE = {
  step: 0,
  navComponents: [
    ProductSearch,
    ProductBasket,
    UserDetails,
    DeliveryDetails,
    PaymentDetails,
    ConfirmOrder,
    Receipt
  ]
};

class NavigationStore extends Reflux.Store {
  constructor() {
    super();
    this.state = cloneDeep(INITIAL_STATE);
    this.listenables = Actions;
  }

  onNavigationReset() {
    this.setState(cloneDeep(INITIAL_STATE));
  }

  onInitNavigation(components) {
    this.setState({navComponents: components});
  }

  onPreviousNavigation() {
    if (this.state.step > 0) {
      this.setState({step: this.state.step -= 1});
    }
  }

  onNextNavigation() {
    if (this.state.step < this.state.navComponents.length) {
      this.setState({step: this.state.step += 1});
    }
  }

  onNavigateTo(step) {
    this.setState({step});
  }
}

export default NavigationStore;
