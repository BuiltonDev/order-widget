import React from 'react';
import Reflux from 'reflux';
import Actions from './Actions';

// Containers
import ProductSearch from 'src/containers/ProductSearch/index.jsx';
import ProductBasket from 'src/containers/ProductBasket/index.jsx';
import UserDetails from 'src/containers/UserDetails/index.jsx';
import DeliveryDetails from 'src/containers/DeliveryDetails/index.jsx';
import PaymentDetails from 'src/containers/PaymentDetails/index.jsx';
import Receipt from 'src/containers/Receipt/index.jsx';

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
}

export default NavigationStore;
