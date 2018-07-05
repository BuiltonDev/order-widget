import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
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

class ProductSearch extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      productSearchList: [],
      search: ''
    };
    this.pagination = {
      page: 0,
      size: 10,
      total: 0
    };
    this.kvass = new Kvass();
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);

    this.store = UserStore;
    this.storeKeys = ['apiUser'];
  }

  // Get personalized products on first load, based on general populariy or based on user if logged in
  componentDidMount() {
    this.setState({isLoading: true});
    const userId = !this.state.apiUser ? '' : this.state.apiUser._id.$oid;
    const body = {model_type: 'collaborative_filtering_recommender', source_id: userId, source: 'user', destination: 'product', size: this.pagination.size};
    this.setState({isLoading: true});
    this.kvass.aiModel().getRecommendations({body, urlParams: {expand: 'response.object'}}, (error, recommendations, res) => {
      if (error) {
        this.searchProduct(''); // do a normal product search if recommendations fail
        return;
      }
      this.setState({isLoading: false, productSearchList: utils.parseRecommendations(recommendations)});
    });
  }

  searchProduct(search) {
    this.setState({isLoading: true});
    this.kvass.product().search({query: search, urlParams: {size: this.pagination.size, page: this.pagination.page, sort: '-created'}}, (error, productListRes, res) => {
      this.setState({isLoading: false, search, productSearchList: productListRes});
    });
  }

  handleSearchSubmit(event) {
    event.preventDefault();
  }

  renderEmptyBody() {
    return (
      <div className="product-list--empty">
        <p>{T.translate('product.noResults')}</p>
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
            {productSearchList.length ? <ProductList productList={productSearchList}></ProductList> : this.renderEmptyBody()}
          </div>
          <Footer>
            <ShoppingCart></ShoppingCart>
          </Footer>
        </div>
      </div>
    );
  }
}

export default ProductSearch;
