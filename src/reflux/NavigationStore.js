import Reflux from 'reflux';

// Containers
import ProductSearch from 'src/containers/ProductSearch';
import ProductBasket from 'src/containers/ProductBasket';
import UserDetails from 'src/containers/UserDetails';
import DeliveryDetails from 'src/containers/DeliveryDetails';
import PaymentDetails from 'src/containers/PaymentDetails';
import ConfirmOrder from 'src/containers/ConfirmOrder';
import Receipt from 'src/containers/Receipt';
import Actions from './Actions';

class NavigationStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
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
    this.listenables = Actions;
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
