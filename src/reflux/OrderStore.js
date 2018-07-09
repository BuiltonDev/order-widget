import Reflux from 'reflux';
import Actions from './Actions';
import cloneDeep from "lodash.clonedeep";

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

  onOrderReset() {
    this.setState({...INITIAL_STATE});
  }
}

export default OrderStore;
