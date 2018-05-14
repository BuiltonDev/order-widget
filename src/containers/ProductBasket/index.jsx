import React from 'react';
import Reflux from 'reflux';
import {DebounceInput} from 'react-debounce-input';
import {Scrollbars} from 'react-custom-scrollbars';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
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
    const addedKey = `${product.item._id.$oid}-1`;
    return (
      <li key={product.item._id.$oid}>
        <span className="product-item__title">{product.item.name}</span>
      </li>
    );
  }

  renderBasketPrice(product) {
    const addedKey = `${product.item._id.$oid}-1`;
    return (
      <li key={addedKey}>
        <span>
          <DebounceInput
            className="product-item__count"
            minLength={1}
            debounceTimeout={500}
            value={product.count}
            onChange={event => this.handleCountChange(product, event)} />
        </span>
        <span className="product_item__price">{product.item.price} {product.item.currency}</span>
        <span className="product_item__total">{product.item.price * product.count} {product.item.currency}</span>
      </li>
    );
  }

  render() {
    const {products, totalCount, totalSum, totalTax} = this.state;
    const productArray = [];
    let currency = ''

    Object.entries(products).forEach(([key, value]) => {
      if (value) {

        if (!currency) currency = value.item.currency; // TODO better solution in the future here for currency

        productArray.push(this.renderBasketItem(value));
        productArray.push(this.renderBasketPrice(value));
      }
    });

    return (
      <div className="product-basket">
        <Header showBackNav={true}>
          <span className="header-title">{T.translate('basket.header')}</span>
        </Header>
        <div className="kvass-widget__content-body">
          <div className="product-list">
            <Scrollbars style={{ height: 380 }}>
              <div className="padding-container">
                <ul>
                  {productArray}
                </ul>
              </div>
            </Scrollbars>
          </div>
          <div className="product-sum">
            <div className="product-sum__line">
              <span>{T.translate('basket.products')}</span>
              <span>{totalCount}</span>
            </div>
            <div className="product-sum__line">
              <span>{T.translate('basket.tax')}</span>
              <span>{totalTax} {currency}</span>
            </div>
            <div className="product-sum__line">
              <span>{T.translate('basket.total')}</span>
              <span className="product-sum__total">{totalSum} {currency}</span>
            </div>
          </div>
          <Footer>
            <button className="kvass-widget__primary-button" disabled={!totalCount} onClick={() => Actions.onNextNavigation()}>{T.translate('basket.checkout')}</button>
          </Footer>
        </div>
      </div>
    );
  }
}

export default ProductBasket;
