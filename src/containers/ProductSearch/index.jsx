import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DebounceInput} from 'react-debounce-input';
import { Scrollbars } from 'react-custom-scrollbars';
import T from 'src/utils/i18n';
import {ShareActor} from 'src/utils';
import Actions from 'src/reflux/Actions';
import Spinner from 'src/components/spinner';
import ShoppingCart from 'src/components/ShoppingCart';
import {AddIcon, RemoveIcon} from 'src/components/svgIcons';

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

  searchProduct(e, search) {
    console.log(search);
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
        <li className="kvass-widget__product-list-item" key={product._id.$oid}>
          <div className="kvass-widget__product-list-item__img">
            {this.renderProductItemImg(product.image_url)}
          </div>
          <span className="kvass-widget__product-list-item__name">{product.name}</span>
          <div className="kvass-widget__product-list-item__toolbar">
            <a href="#" onClick={() => Actions.onRemoveProduct(product)}><RemoveIcon className="kvass-widget__svg--red"></RemoveIcon></a>
            <a href="#" onClick={() => Actions.onAddProduct(product)}><AddIcon className="kvass-widget__svg--green"></AddIcon></a>
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
      <div className="kvass-widget__product-list--empty">
        <p>{T.translate('product.searchPlaceholder')}</p>
      </div>
    );
  }

  render() {
    const {search, isLoading, globalCount} = this.state;
    return (
      <div className="kvass-widget__product-search">
        <div className="kvass-widget__content-header">
          <form className="kvass-widget__search-form" onSubmit={this.handleSearchSubmit}>
            <DebounceInput
              className="kvass-widget__search-input"
              minLength={1}
              debounceTimeout={500}
              value={search}
              placeholder={T.translate('product.searchPlaceholder')}
              onChange={event => this.searchProduct(event, event.target.value)} />
            <input className="kvass-widget__primary-button" type="submit" value={T.translate('product.search')} />
          </form>
        </div>
        <div className="kvass-widget__content-body">
          <Spinner show={isLoading}></Spinner>
          <div className="kvass-widget__product-list">
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

ProductSearch.propTypes = {
};

export default ProductSearch;
