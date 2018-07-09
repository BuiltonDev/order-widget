import Reflux from 'reflux';
import Actions from './Actions';

const INITIAL_STATE = {
  order: {}
};

class OrderStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {...INITIAL_STATE};
    this.listenables = Actions;
  }

  onSetOrder(order) {
    if (!order) return;
    this.setState({ order });
  }
}

export default OrderStore;
