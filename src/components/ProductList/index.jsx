import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
import ShareActor from '@shareactor/shareactor-sdk';
import {Scrollbars} from 'react-custom-scrollbars';
import Actions from '../../reflux/Actions';
import AddIcon from '../svgIcons/addIcon';
import MinusIcon from '../svgIcons/MinusIcon';
import T from '../../utils/i18n';


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
    this.endpoint = ShareActor().endpoint;
    this.apiKey = ShareActor().apiKey;
    this.items = props.productList;
    this.index = 0;
    this.lastMove = new Date();
    this.delay = 50;

    this.animate = this.animate.bind(this);
    this.sa = new ShareActor();
  }

  renderProductImg(imageUrl) {
    if (!imageUrl) return;
    return (
      <img src={`${this.sa.endpoint}images/${image_url}?api_key=${this.sa.apiKey}`} alt="product image"/>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoading) {
      this.items = [];
    }
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

  renderChildrenItems(productList) {
    return productList.map(product =>
      <li className="product-list-item" key={product._id.$oid}>
        <div className="product-list-item__img">
          {this.renderProductImg(product.image_url)}
        </div>
        <span className="product-list-item__name">
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
  isLoading: false
};

ProductList.propTypes = {
  productList: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
};

export default ProductList;
