import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DebounceInput} from 'react-debounce-input';
import T from 'src/utils/i18n';
import {ShareActor} from 'src/utils';
import Actions from 'src/reflux/Actions';
import Spinner from 'src/components/Spinner';
import Header from 'src/components/Header';
import ProductList from 'src/components/ProductList';
import ShoppingCart from 'src/components/ShoppingCart';

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
    this.sa = ShareActor();
  }

  searchProduct(search) {
    if (search === this.state.search) return;
    // Empty search
    if (!search.length) {
      this.setState({search, productSearchList: []});
      return;
    }

    this.setState({isLoading: true});
    this.sa.product().search({query: search, urlParams: {size: this.pagination.size, page: this.pagination.page}}, (error, productSearchList, res) => {
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

  renderEmptyBody() {
    return (
      <div className="product-list--empty">
        <p>{T.translate('product.searchPlaceholder')}</p>
      </div>
    );
  }

  render() {
    const {search, isLoading, productSearchList} = this.state;
    return (
      <div className="product-search">
        <Header showBackNav={false}>
          <form className="search-form" onSubmit={this.handleSearchSubmit}>
            <DebounceInput
              className="kvass-widget__input"
              minLength={1}
              debounceTimeout={500}
              placeholder={T.translate('product.searchPlaceholder')}
              onChange={event => this.searchProduct(event.target.value)} />
            <input className="kvass-widget__primary-button" type="submit" value={T.translate('product.search')} />
          </form>
        </Header>
        <div className="kvass-widget__content-body">
          <Spinner show={isLoading}></Spinner>
          <div className="product-list">
            {search ? <ProductList productList={productSearchList}></ProductList> : this.renderEmptyBody()}
          </div>
          <div className="kvass-widget__content-footer">
            <ShoppingCart></ShoppingCart>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductSearch;
