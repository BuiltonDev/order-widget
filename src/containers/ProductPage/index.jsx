import React from 'react';
import Reflux from 'reflux';
import Kvass from '@kvass.ai/core-sdk';
import {Scrollbars} from 'react-custom-scrollbars';
import {DebounceInput} from 'react-debounce-input';
import Actions from 'src/reflux/Actions';
import ProductStore from 'src/reflux/ProductStore';
import T from 'src/utils/i18n';
import utils from 'src/utils';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import ProductImage from 'src/components/ProductImage';
import MinusIcon from 'src/components/SvgIcons/MinusIcon';
import AddIcon from 'src/components/SvgIcons/AddIcon';
import ShoppingCart from 'src/components/ShoppingCart';
import ProductRecommendations from 'src/components/ProductRecommendations';

class ProductPage extends Reflux.Component {
  static onCountChange(product, count, event) {
    const diff = parseInt(event.target.value - count, 10);
    if (event.target.value > count) {
      Actions.onAddProduct(product, diff);
    } else {
      Actions.onRemoveProduct(product, event.target.value >= 0 ? diff : -count);
    }
  }

  static renderFooter() {
    return (
      <Footer>
        <ShoppingCart />
      </Footer>
    );
  }

  constructor(props) {
    super(props);
    this.kvass = new Kvass();

    this.store = ProductStore;
    this.storeKeys = ['selectedProduct', 'products'];

    this.renderHeader = this.renderHeader.bind(this);
    this.renderBody = this.renderBody.bind(this);
  }

  addToCart() {
    Actions.onAddProduct(this.state.selectedProduct);
  }

  renderHeader() {
    const {selectedProduct} = this.state;
    return (
      <Header showBackNav={true} backStep={0}>
        <span className="header-title">{selectedProduct.name}</span>
      </Header>
    );
  }

  renderBody() {
    const {selectedProduct, products} = this.state;
    const count = products[selectedProduct._id.$oid] ? products[selectedProduct._id.$oid].count : 0;
    const totalPrice = utils.roundNumber(selectedProduct.price * count, 2);

    return (
      <div>
        <Scrollbars style={{ flex: 1 }}>
          <div className="product-page__image">
            <ProductImage
              imageUrl={selectedProduct.image_url}
              apiKey={this.kvass.apiKey}
              endpoint={this.kvass.endpoint}
            />
          </div>
          <div className="product-page__info">
            <div className="product-page__description">
              <span>{selectedProduct.short_description}</span>
            </div>
            <div className="product-page__list">
              <ul>
                <li>
                  <span className="list-item">{T.translate('productPage.quantity')}</span>
                  <div className="list-item__toolbar">
                    <a href="#" onClick={() => Actions.onRemoveProduct(selectedProduct)}><MinusIcon className="svg-icon--minus" /></a>
                    <DebounceInput
                      className="list-item__count-input"
                      minLength={1}
                      debounceTimeout={500}
                      value={count.toString()}
                      onChange={event =>
                        this.constructor.onCountChange(selectedProduct, count, event)
                      }
                    />
                    <a href="#" onClick={() => Actions.onAddProduct(selectedProduct)}>
                      <AddIcon className="svg-icon--plus" />
                    </a>
                  </div>
                </li>
                <li>
                  <span className="list-item">
                    {T.translate('productPage.unitPrice')}
                  </span>
                  <span className="list-item list-item__count">
                    {utils.roundNumber(selectedProduct.price, 2)} {selectedProduct.currency}
                  </span>
                </li>
                <li>
                  <span className="list-item">{T.translate('productPage.totalPrice')}</span>
                  <span className="list-item list-item__count">
                    {utils.roundNumber(totalPrice, 2)} {selectedProduct.currency}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Scrollbars>
        <ProductRecommendations
          title={T.translate('recommendations.similar')}
          modelType={'content_similarity_graph'}
          sourceId={selectedProduct._id.$oid}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="product-page">
        {this.renderHeader()}
        <div className="kvass-widget__content-body">
          {this.renderBody()}
          {this.constructor.renderFooter()}
        </div>
      </div>
    );
  }
}

export default ProductPage;
