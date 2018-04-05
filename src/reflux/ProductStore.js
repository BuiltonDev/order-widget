import Reflux from 'reflux';
import Actions from './Actions';
import cloneDeep from 'lodash.clonedeep';

class ProductStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      products: {},
      globalCount: 0
    };
    this.listenables = Actions;
  }

  onAddProduct(product) {
    const id = product._id.$oid;
    let copy = {
      item: product,
      count: 0
    };

    // Already in list, just add to internal count
    if (this.state.products[id]) {
      copy = cloneDeep(this.state.products[id]);
    }
    copy.count = copy.count + 1;

    this.setState({
      products: {
        ...this.state.products,
        [id]: copy
      },
      globalCount: this.state.globalCount + 1
    });
  }

  onRemoveProduct(product) {
    const id = product._id.$oid;
    if (!this.state.products[id]) return;

    let copy = cloneDeep(this.state.products[id]);
    copy.count = copy.count - 1;

    // Last item of product
    if (copy.count < 1) copy = null;


    this.setState({
      products: {
        ...this.state.products,
        [id]: copy
      },
      globalCount: this.state.globalCount - 1
    });
  }
}

export default ProductStore;
