import Reflux from 'reflux';
import cloneDeep from 'lodash.clonedeep';
import Actions from './Actions';

class ProductStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      products: {},
      globalCount: 0
    };
    this.listenables = Actions;
  }

  onAddProduct(product, addCount = 1) {
    const id = product._id.$oid;
    let copy = {
      item: product,
      count: 0
    };

    // Already in list, just add to internal count
    if (this.state.products[id]) {
      copy = cloneDeep(this.state.products[id]);
    }
    copy.count += addCount;

    this.setState({
      products: {
        ...this.state.products,
        [id]: copy
      },
      globalCount: this.state.globalCount + addCount
    });
  }

  onRemoveProduct(product, minusCount = -1) {
    const id = product._id.$oid;
    if (!this.state.products[id]) return;

    let copy = cloneDeep(this.state.products[id]);
    copy.count += minusCount;

    // Last item of product
    if (copy.count < 1) copy = null;


    this.setState({
      products: {
        ...this.state.products,
        [id]: copy
      },
      globalCount: this.state.globalCount + minusCount
    });
  }
}

export default ProductStore;
