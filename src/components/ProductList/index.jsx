import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
import {Scrollbars} from 'react-custom-scrollbars';
import Actions from 'src/reflux/Actions';
import Kvass from '@kvass.ai/core-sdk';
import AddIcon from 'src/components/SvgIcons/AddIcon';
import MinusIcon from 'src/components/SvgIcons/MinusIcon';
import T from 'src/utils/i18n';

const DEFAULT_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>'

class ProductList extends Reflux.Component {
  constructor(props) {
    super(props);
    this.kvass = new Kvass();
  }

  addDefaultSrc(ev) {
    ev.target.src = DEFAULT_IMAGE;
  }

  renderProductImg(image_url) {
    let src = DEFAULT_IMAGE;
    if (image_url) src = `${this.kvass.endpoint}images/${image_url}?api_key=${this.kvass.apiKey}`;

    return (
      <img onError={this.addDefaultSrc} src={src} alt="product image"/>
    );
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
        <li className="product-list-item" key={product._id.$oid}>
          <div className="product-list-item__img">
            {this.renderProductImg(product.image_url)}
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
