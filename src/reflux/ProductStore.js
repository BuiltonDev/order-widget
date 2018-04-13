import Reflux from 'reflux';
import cloneDeep from 'lodash.clonedeep';
import Actions from './Actions';

class ProductStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      products: {},
      totalCount: 0,
      totalSum: 0,
      totalTax: 0
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
      totalCount: this.state.totalCount + addCount,
      totalSum: this.state.totalSum + (copy.item.price * addCount),
      totalTax: this.state.totalTax + (copy.item.vat * addCount)
    });
  }

  onRemoveProduct(product, minusCount = -1) {
    const id = product._id.$oid;
    if (!this.state.products[id]) return;

    const copy = cloneDeep(this.state.products[id]);
    const maxRemovable = Math.max(-copy.count, minusCount);

    copy.count += maxRemovable;

    this.setState({
      products: {
        ...this.state.products,
        [id]: copy.count > 0 ? copy : null // Set to null on last item of product
      },
      totalCount: this.state.totalCount + maxRemovable,
      totalSum: this.state.totalSum + (copy.item.price * maxRemovable),
      totalTax: this.state.totalTax + (copy.item.vat * maxRemovable)
    });
  }
}

export default ProductStore;
