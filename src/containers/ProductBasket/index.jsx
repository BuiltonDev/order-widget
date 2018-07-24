import React from 'react';
import Reflux from 'reflux';
import {Scrollbars} from 'react-custom-scrollbars';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Actions from 'src/reflux/Actions';
import ProductStore from 'src/reflux/ProductStore';
import BasketList from 'src/components/BasketList';
//import ProductRecommendations from 'src/components/ProductRecommendations';
import T from 'src/utils/i18n';
import utils from 'src/utils';

class ProductBasket extends Reflux.Component {
  static handleCountChange(product, event) {
    const diff = parseInt(event.target.value - product.count, 10);
    if (event.target.value > product.count) {
      Actions.onAddProduct(product.item, diff);
    } else {
      Actions.onRemoveProduct(product.item, event.target.value >= 0 ? diff : -product.count);
    }
  }

  static renderHeader() {
    return(
      <Header showBackNav={true}>
        <span className="header-title">{T.translate('basket.header')}</span>
      </Header>
    );
  }

  constructor(props) {
    super(props);
    this.store = ProductStore;
  }

  renderBody() {
    const {products, totalCount, totalSum, totalTax} = this.state;
    const currency = utils.getCurrency(products);

    return (
      <div>
        <div className="product-list">
          <Scrollbars style={{ flex: 1 }}>
            <div className="padding-container">
              <BasketList products={products} onCountChange={this.constructor.handleCountChange}/>
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
            <span>{utils.roundNumber(totalTax, 2)} {currency}</span>
          </div>
          <div className="product-sum__line">
            <span>{T.translate('basket.total')}</span>
            <span className="product-sum__total">{utils.roundNumber(totalSum, 2)} {currency}</span>
          </div>
        </div>
      </div>
    );
  }

  renderFooter() {
    const {totalCount} = this.state;
    return (
      <Footer>
        <button
          className="kvass-widget__primary-button"
          disabled={!totalCount}
          onClick={
            () => Actions.onNextNavigation()
          }
        >
          {T.translate('basket.checkout')}
        </button>
      </Footer>
    );
  }

  render() {
    // Currently the recommendations dont support list of products
    // const productKeys = Object.keys(products)[0];
    // const recommenProduct = products[productKeys].item;

    return (
      <div className="product-basket">
        {this.constructor.renderHeader()}
        <div className="kvass-widget__content-body">
          {this.renderBody()}
          {/*<ProductRecommendations title={T.translate('recommendations.complementary')} modelType={'frequent_items_recommender'} sourceId={recommenProduct._id.$oid} customClass={'basket-recommendations'}/>*/}
          {this.renderFooter()}
        </div>
      </div>
    );
  }
}

export default ProductBasket;
