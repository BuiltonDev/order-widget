import React from 'react';
import Reflux from 'reflux';
import {DebounceInput} from 'react-debounce-input';
import T from 'src/utils/i18n';
import Kvass from '@kvass.ai/core-sdk';
import Actions from 'src/reflux/Actions';
import UserStore from 'src/reflux/UserStore';
import Spinner from 'src/components/Spinner';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import ProductList from 'src/components/ProductList';
import ShoppingCart from 'src/components/ShoppingCart';
import utils from 'src/utils';
import ProductStore from 'src/reflux/ProductStore';

class ProductSearch extends Reflux.Component {
  static renderFooter() {
    return (
      <Footer>
        <ShoppingCart />
      </Footer>
    );
  }

  constructor(props) {
    super(props);

    this.pagination = {
      page: 0,
      size: 10,
      total: 0
    };
    this.kvass = new Kvass();

    this.stores = [UserStore, ProductStore];
    this.storeKeys = ['apiUser', 'searchString'];
    this.state = {
      isLoading: true,
      productSearchList: [],
      search: ''
    };

    this.renderBody = this.renderBody.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

  // Get personalized products on first load, based on general populariy or based on user if logged in
  componentDidMount() {
    const userId = !this.state.apiUser ? '' : this.state.apiUser._id.$oid;
    const body = {model_type: 'collaborative_filtering_recommender', source_id: userId, source: 'user', destination: 'product', size: this.pagination.size};
    this.setState({
      isLoading: true
    });

    if (this.state.searchString) {
      this.searchProduct(this.state.searchString);
    } else {
      this.kvass.aiModel().getRecommendations({body, urlParams: {expand: 'response.object'}}, (error, recommendations) => {
        if (error) {
          // do a normal product search if recommendations fail
          this.searchProduct(this.state.searchString);
          return;
        }
        this.setState({
          isLoading: false,
          productSearchList: utils.parseRecommendations(recommendations)
        });
      });
    }
  }

  searchProduct(search) {
    this.setState({isLoading: true, search});
    this.kvass.product().search({query: search, urlParams: {size: this.pagination.size, page: this.pagination.page, sort: '-created'}}, (error, productListRes) => {
      this.setState({isLoading: false, productSearchList: productListRes});
      Actions.onSearch(search);
    });
  }

  static handleSearchSubmit(event) {
    event.preventDefault();
  }

  static renderEmptyBody() {
    return (
      <div className="product-list--empty">
        <p>{T.translate('product.noResults')}</p>
      </div>
    );
  }

  renderHeader() {
    const {search} = this.state;
    return (
      <Header showBackNav={false}>
        <form className="search-form" onSubmit={this.constructor.handleSearchSubmit}>
          <DebounceInput
            className="kvass-widget__input"
            minLength={1}
            value={search}
            debounceTimeout={500}
            placeholder={T.translate('product.searchPlaceholder')}
            onChange={event => this.searchProduct(event.target.value)} />
          <input
            className="kvass-widget__primary-button"
            type="submit"
            value={T.translate('product.search')}
          />
        </form>
      </Header>
    );
  }

  renderBody() {
    const {productSearchList} = this.state;
    return (
      <div className="product-list">
        {productSearchList.length ?
          <ProductList isLoading={this.state.isLoading} productList={productSearchList} />
          :
          this.constructor.renderEmptyBody()}
      </div>
    );
  }

  render() {
    const {isLoading} = this.state;
    return (
      <div className="product-search">
        {this.renderHeader()}
        <div className="kvass-widget__content-body">
          <Spinner show={isLoading} />
          {this.renderBody()}
          {this.constructor.renderFooter()}
        </div>
      </div>
    );
  }
}

export default ProductSearch;
