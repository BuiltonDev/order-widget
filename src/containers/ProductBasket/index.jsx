import React from 'react';
import Reflux from 'reflux';
import {DebounceInput} from 'react-debounce-input';
import Header from 'src/components/Header';
import Actions from 'src/reflux/Actions';
import ProductStore from 'src/reflux/ProductStore';
import ProductList from 'src/components/ProductList';
import CloseIcon from 'src/components/SvgIcons/CloseIcon';
import T from 'src/utils/i18n';

class ProductBasket extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = ProductStore;
  }

  handleCountChange(product, event) {
    const diff = parseInt(event.target.value - product.count);
    if (event.target.value > product.count) {
      Actions.onAddProduct(product.item, diff);
    } else {
      Actions.onRemoveProduct(product.item, event.target.value >= 0 ? diff : -product.count);
    }
  }

  renderBasketItem(product) {
    return (
      <li key={product.item._id.$oid}>
        <span>{product.item.name}</span>
        <DebounceInput
          minLength={1}
          debounceTimeout={500}
          value={product.count}
          onChange={event => this.handleCountChange(product, event)} />
        <div onClick={() => Actions.onRemoveProduct(product, -product.count)}>
          <CloseIcon></CloseIcon>
        </div>
      </li>
    );
  }

  getTotalTax(products) {
    let vat = 0;
    products.map((product) => {
      vat += product.vat;
    });
    return vat;
  }

  getTotal(products) {
    let total = 0;
    products.map((product) => {
      total += product.price;
    });
    return total;
  }

  render() {
    const {products, globalCount} = this.state;
    const productArray = [];

    Object.entries(products).forEach(([key, value]) => {
      if (value) productArray.push(this.renderBasketItem(value));
    });

    return (
      <div className="product-basket">
        <Header showBackNav={true}>
          <span>{T.translate('basket.header')}</span>
        </Header>
        <div className="kvass-widget__content-body">
          <div className="product-list">
            <ul>
              {productArray}
            </ul>
          </div>
          <div className="kvass-widget__content-footer">
            <p>Nr of products: {globalCount}</p>
            <p>Tax: {this.getTotalTax(productArray)}</p>
            <p>Total w/tax: {this.getTotal(productArray)}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductBasket;
