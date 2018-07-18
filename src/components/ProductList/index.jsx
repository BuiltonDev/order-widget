import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import Actions from 'src/reflux/Actions';
import Kvass from '@kvass.ai/core-sdk';
import AddIcon from 'src/components/SvgIcons/AddIcon';
import MinusIcon from 'src/components/SvgIcons/MinusIcon';
import T from 'src/utils/i18n';
import ProductImage from 'src/components/ProductImage';
import Animate from 'src/utils/animate';

class ProductList extends Reflux.Component {
  static renderEmptyResults() {
    return (
      <div className="product-list--empty">
        <p>{T.translate('product.noResults')}</p>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.kvass = new Kvass();
    this.animation = new Animate();
  }

  onProductClick(product) {
    Actions.onSelectProduct(product);
    Actions.onNavigateTo(7); // Navigate to product page
  }

  componentDidMount() {
    this.renderAnimation();
  }

  componentDidUpdate() {
    this.renderAnimation();
  }

  renderAnimation() {
    if (!this.props.isLoading && this.props.productList) {
      const items = document.getElementsByClassName('in-page-transition');
      for (let i = 0; i < items.length; i += 1) {
        items[i].classList.remove('is-moved');
      }
      this.animation.animateInViewTransition();
    }
  }

  renderProductImg(imageUrl) {
    if (!imageUrl) return;
    return (
      <ProductImage imageUrl={imageUrl} apiKey={this.kvass.apiKey} endpoint={this.kvass.endpoint} />
    );
  }

  renderChildrenItems(productList) {
    return productList.map(product =>
      <li className="product-list-item in-page-transition" key={product._id.$oid}>
        <div className="product-list-item--description" onClick={() => this.onProductClick(product)}>
          <div className="product-list-item__img">
            {this.renderProductImg(product.image_url)}
          </div>
          <span className="product-list-item__name">
            {product.name}
          </span>
        </div>
        <div className="product-list-item__toolbar">
          <a href="#" onClick={() => Actions.onRemoveProduct(product)}>
            <MinusIcon className="svg-icon--red" />
          </a>
          <a href="#" onClick={() => Actions.onAddProduct(product)}>
            <AddIcon className="svg-icon--green" />
          </a>
        </div>
      </li>);
  }

  render() {
    const { productList } = this.props;
    if (!productList.length) return this.constructor.renderEmptyResults();

    return (
      <Scrollbars style={{ flex: 1 }}>
        <ul>
          {this.renderChildrenItems(productList)}
        </ul>
      </Scrollbars>
    );
  }
}

ProductList.defaultProps = {
  productList: [],
  isLoading: false
};

ProductList.propTypes = {
  productList: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
};

export default ProductList;
