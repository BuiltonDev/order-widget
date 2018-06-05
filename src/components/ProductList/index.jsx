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
  constructor(props) {
    super(props);
    this.kvass = new Kvass();
  }

  onProductClick(product) {
    Actions.onSelectProduct(product)
    Actions.onNavigateTo(7); // Navigate to product page
  }

  render() {
    const {productList} = this.props;
    if (!productList.length) return (
      <div className="product-list--empty">
        <p>{T.translate('product.noResults')}</p>
      </div>
    );

    const children = productList.map((product) => {
      return (
        <li className="product-list-item" key={product._id.$oid} onClick={() => this.onProductClick(product)}>
          <div className="product-list-item__img">
            <ProductImage imageUrl={product.image_url} apiKey={this.kvass.apiKey} endpoint={this.kvass.endpoint} />
          </div>
          <span className="product-list-item__name">{product.name}</span>
          <div className="product-list-item__toolbar">
            <a href="#" onClick={() => Actions.onRemoveProduct(product)}><MinusIcon className="svg-icon--minus" /></a>
            <a href="#" onClick={() => Actions.onAddProduct(product)}><AddIcon className="svg-icon--plus" /></a>
          </div>
        </li>
      );
    });

    return (
      <Scrollbars style={{ height: 500 }}>
        <ul>
          {children}
        </ul>
      </Scrollbars>
    );
  }
}

ProductList.defaultProps = {
  productList: []
};

ProductList.propTypes = {
  productList: PropTypes.array.isRequired
};

export default ProductList;
