import React from 'react';
import Reflux from 'reflux';
import Actions from './Actions';

// Containers
import ProductSearch from 'src/containers/ProductSearch/index.jsx';
import ProductBasket from 'src/containers/ProductBasket/index.jsx';

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
    console.log('Ping');
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
