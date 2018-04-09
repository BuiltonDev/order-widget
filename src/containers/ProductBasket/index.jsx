import React from 'react';
import Reflux from 'reflux';
import Header from 'src/components/Header';
import Actions from 'src/reflux/Actions';
import ProductStore from 'src/reflux/ProductStore';
import ProductList from 'src/components/ProductList';
import {ShareActor} from 'src/utils';

class ProductBasket extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = ProductStore;
  }

  renderBasketItem(product) {
    return (
      <li className="product-list-item" key={product.item._id.$oid}>
        <span className="product-list-item__name">{product.item.name}</span>
        <div className="product-list-item__toolbar">
          Nr: {product.count}
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
