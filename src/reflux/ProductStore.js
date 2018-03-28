import Reflux from 'reflux';
import Actions from './Actions';

class ProductStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      selectedProducts: [{
        product: null
      }],
      order: null,
      user: null
    };
    this.listenables = Actions;
  }

  onSetStore(store) {
    this.setState(store);
  }

  onSetLastProduct(product) {
    const store = this.state;
    const lastProduct = store.selectedProducts[store.selectedProducts.length - 1];
    lastProduct.product = product;
    this.setState(store);
  }

  onAddOneProduct() {
    const store = this.state;
    store.selectedProducts.push({
      product: null
    });
    this.setState(store);
  }

  removeLastProduct() {
    const { selectedProducts } = this.state;
    selectedProducts.pop();
    this.setState({ selectedProducts });
  }

  removeProduct(key) {
    const { selectedProducts } = this.state;
    selectedProducts.splice(key, 1);
    this.setState({ selectedProducts });
  }

  onSetOrder(order) {
    this.setState({ order });
  }

  onSetUser(user) {
    this.setState({ user });
  }
}

export default ProductStore;
