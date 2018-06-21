import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
import {Scrollbars} from 'react-custom-scrollbars';
import Actions from 'src/reflux/Actions';
import Kvass from '@kvass.ai/core-sdk';
import AddIcon from 'src/components/SvgIcons/AddIcon';
import MinusIcon from 'src/components/SvgIcons/MinusIcon';
import T from 'src/utils/i18n';
import ProductImage from 'src/components/ProductImage';

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
    this.items = props.productList;
    this.index = 0;
    this.lastMove = new Date();
    this.delay = 50;

    this.animate = this.animate.bind(this);
  }

  onProductClick(product) {
    Actions.onSelectProduct(product);
    Actions.onNavigateTo(7); // Navigate to product page

  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    this.moveItem();
    requestAnimationFrame(this.animate);
  }

  moveItem() {
    const now = new Date();
    if (now - this.lastMove < this.delay || !this.items[this.index]) {
      return;
    }
    this.lastMove = now;
    this.items[this.index].classList.add('is-moved');
    this.index += 1;
  }

  renderProductImg(imageUrl) {
    if (!imageUrl) return;
    return (
      <ProductImage imageUrl={imageUrl} apiKey={this.kvass.apiKey} endpoint={this.kvass.endpoint} />
    );
  }

  renderChildrenItems(productList) {
    return productList.map(product =>
      <li className="product-list-item" key={product._id.$oid}>
        <div className="product-list-item__img">
          {this.renderProductImg(product.image_url)}
        </div>
        <span className="product-list-item__name" onClick={() => this.onProductClick(product)}>
          {product.name}
        </span>
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

    if (!this.props.isLoading) {
      this.items = document.getElementsByClassName('product-list-item');
      this.index = 0;
    }

    return (
      <Scrollbars style={{ height: 500 }}>
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
