import React from 'react';
import Reflux from 'reflux';
import {Scrollbars} from 'react-custom-scrollbars';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Actions from 'src/reflux/Actions';
import ProductStore from 'src/reflux/ProductStore';
import ProductList from 'src/components/ProductList';
import CloseIcon from 'src/components/SvgIcons/CloseIcon';
import BasketList from 'src/components/BasketList';
import T from 'src/utils/i18n';
import getCurrency from 'src/utils/getCurrency';

class ProductBasket extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = ProductStore;

    this.handleCountChange = this.handleCountChange.bind(this);
  }

  handleCountChange(product, event) {
    const diff = parseInt(event.target.value - product.count);
    if (event.target.value > product.count) {
      Actions.onAddProduct(product.item, diff);
    } else {
      Actions.onRemoveProduct(product.item, event.target.value >= 0 ? diff : -product.count);
    }
  }

  render() {
    const {products, totalCount, totalSum, totalTax} = this.state;
    const currency = getCurrency(products);

    return (
      <div className="product-basket">
        <Header showBackNav={true}>
          <span className="header-title">{T.translate('basket.header')}</span>
        </Header>
        <div className="kvass-widget__content-body">
          <div className="product-list">
            <Scrollbars style={{ height: 380 }}>
              <div className="padding-container">
                <BasketList products={products} onCountChange={this.handleCountChange}/>
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
