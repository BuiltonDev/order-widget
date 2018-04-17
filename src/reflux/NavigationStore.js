import Reflux from 'reflux';

// Containers
import ProductSearch from 'src/containers/ProductSearch';
import ProductBasket from 'src/containers/ProductBasket';
import Actions from './Actions';

class NavigationStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      step: 0,
      navComponents: [
        ProductSearch,
        ProductBasket
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
}

export default NavigationStore;
