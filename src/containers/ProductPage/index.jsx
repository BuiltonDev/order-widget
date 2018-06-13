import React from 'react';
import Reflux from 'reflux';
import Kvass from '@kvass.ai/core-sdk';
import {Scrollbars} from 'react-custom-scrollbars';
import {DebounceInput} from 'react-debounce-input';
import PropTypes from 'prop-types';
import Actions from 'src/reflux/Actions';
import ProductStore from 'src/reflux/ProductStore';
import T from 'src/utils/i18n';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import ProductImage from 'src/components/ProductImage';
import MinusIcon from 'src/components/SvgIcons/MinusIcon';
import AddIcon from 'src/components/SvgIcons/AddIcon';
import ShoppingCart from 'src/components/ShoppingCart';

const LOREM_IPSUM = 'Pellentesque est lorem, euismod in nunc sed, vulputate rutrum nisi. Mauris semper convallis interdum. Aliquam feugiat semper tempus. Maecenas bibendum eget erat in euismod. Maecenas blandit a risus eu vehicula. Morbi feugiat est a quam tempor, at porta nunc eleifend. Integer lobortis, lorem quis luctus euismod, enim risus ultricies augue, quis vestibulum velit purus sit amet enim. Aenean at finibus tortor. Suspendisse potenti. Fusce semper, mi a posuere sollicitudin, ligula arcu dapibus lacus, ac laoreet dui nisl malesuada justo. Phasellus commodo consectetur vestibulum. Nam volutpat, erat in mollis ornare, diam ex venenatis est, ut laoreet velit lacus quis mi. Donec aliquet arcu neque, id condimentum urna blandit sit amet. Phasellus metus diam, dignissim sit amet vehicula eu, iaculis ac urna. Ut sodales lacinia purus, eu vehicula urna porttitor quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

class ProductPage extends Reflux.Component {
  constructor(props) {
    super(props);
    this.kvass = new Kvass();

    this.store = ProductStore;
    this.storeKeys = ['selectedProduct'];
  }

  addToCart() {
    Actions.onAddProduct(this.state.selectedProduct);
  }

  onCountChange(product, event) {
    const diff = parseInt(event.target.value - product.count);
    if (event.target.value > product.count) {
      Actions.onAddProduct(product.item, diff);
    } else {
      Actions.onRemoveProduct(product.item, event.target.value >= 0 ? diff : -product.count);
    }
  }

  render() {
    const {selectedProduct} = this.state;

    return (
      <div className="product-page">
        <Header showBackNav={true} backStep={0}>
          <span className="header-title">{selectedProduct.name}</span>
        </Header>
        <div className="kvass-widget__content-body">
          <Scrollbars style={{ height: 500 }}>
            <div className="product-page__image">
              <ProductImage imageUrl={selectedProduct.image_url} apiKey={this.kvass.apiKey} endpoint={this.kvass.endpoint} />
            </div>
            <div className="product-page__info">
              <div className="product-page__description">
                <span>{LOREM_IPSUM}</span>
              </div>
              <ul className="product-page__toolbar">
                <li className="product-page__quantity">
                  <span>{T.translate('productPage.quantity')}</span>
                  <div>
                    <a href="#" onClick={() => Actions.onRemoveProduct(selectedProduct)}><MinusIcon className="svg-icon--minus" /></a>
                    <span className="basket-item__count">
                      <DebounceInput
                        className="basket-item__count-input"
                        minLength={1}
                        debounceTimeout={500}
                        value={0}
                        onChange={event => this.onCountChange(selectedProduct, event)} />
                    </span>
                    <a href="#" onClick={() => Actions.onAddProduct(selectedProduct)}><AddIcon className="svg-icon--plus" /></a>
                  </div>
                </li>
                <li className="product-page__unit-price">
                  <span>{T.translate('productPage.unitPrice')}</span>
                  <span>5</span>
                </li>
                <li className="product-page__total-price">
                  <span>{T.translate('productPage.totalPrice')}</span>
                  <span>5</span>
                </li>
              </ul>
              <button className="kvass-widget__primary-button" onClick={() => this.addToCart()}>{T.translate('productPage.addToCart')}</button>
            </div>
          </Scrollbars>
          <Footer>
            <ShoppingCart></ShoppingCart>
          </Footer>
        </div>
      </div>
    );
  }
}

export default ProductPage;
