import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DebounceInput} from 'react-debounce-input';
import {Scrollbars} from 'react-custom-scrollbars';
import T from 'src/utils/i18n';
import {ShareActor} from 'src/utils';
import Actions from 'src/reflux/Actions';
import Spinner from 'src/components/Spinner';
import ShoppingCart from 'src/components/ShoppingCart';
import AddIcon from 'src/components/SvgIcons/AddIcon';
import MinusIcon from 'src/components/SvgIcons/MinusIcon';

class ProductSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      productSearchList: [],
      search: ''
    };
    this.pagination = {
      page: 0,
      size: 9,
      total: 0
    };
    this.endpoint = ShareActor().endpoint;
    this.apiKey = ShareActor().apiKey;
  }

  searchProduct(search) {
    if (search === this.state.search) return;
    // Empty search
    if (!search.length) {
      this.setState({search, productSearchList: []});
      return;
    }

    this.setState({isLoading: true});
    ShareActor().product().search({query: this.state.search, urlParams: {size: this.pagination.size, page: this.pagination.page}}, (error, productSearchList, res) => {
      this.pagination.total = res.headers['x-pagination-total'];
      this.setState({
        isLoading: false,
        search,
        productSearchList
      });
    });
  }

  handleSearchSubmit(event) {
    event.preventDefault();
  }

  renderProductItemImg(image_url) {
    if (!image_url) return;

    return (
      <img src={`${this.endpoint}images/${image_url}?api_key=${this.apiKey}`} alt="product image"/>
    );
  }

  renderProductItems() {
    if (!this.state.productSearchList.length) return;
    const children = this.state.productSearchList.map((product) => {
      return (
        <li className="product-list-item" key={product._id.$oid}>
          <div className="product-list-item__img">
            {this.renderProductItemImg(product.image_url)}
          </div>
          <span className="product-list-item__name">{product.name}</span>
          <div className="product-list-item__toolbar">
            <a href="#" onClick={() => Actions.onRemoveProduct(product)}><MinusIcon className="svg-icon--red"></MinusIcon></a>
            <a href="#" onClick={() => Actions.onAddProduct(product)}><AddIcon className="svg-icon--green"></AddIcon></a>
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

  renderEmptyBody() {
    return (
      <div className="product-list--empty">
        <p>{T.translate('product.searchPlaceholder')}</p>
      </div>
    );
  }

  render() {
    const {search, isLoading, globalCount} = this.state;
    return (
      <div className="product-search">
        <div className="kvass-widget__content-header">
          <form className="search-form" onSubmit={this.handleSearchSubmit}>
            <DebounceInput
              className="search-input"
              minLength={1}
              debounceTimeout={500}
              value={search}
              placeholder={T.translate('product.searchPlaceholder')}
              onChange={event => this.searchProduct(event.target.value)} />
            <input className="kvass-widget__primary-button" type="submit" value={T.translate('product.search')} />
          </form>
        </div>
        <div className="kvass-widget__content-body">
          <Spinner show={isLoading}></Spinner>
          <div className="product-list">
            {search ? this.renderProductItems() : this.renderEmptyBody()}
          </div>
          <div className="kvass-widget__content-footer">
            <ShoppingCart></ShoppingCart>
            {/*<button className="kvass-widget__primary-button">Next</button>*/}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductSearch;
