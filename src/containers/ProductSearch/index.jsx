import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Reflux from 'reflux';
import ProductStore from '../../reflux/ProductStore';
import T from '../../utils/i18n';
import {ShareActor} from '../../utils';
import {DebounceInput} from 'react-debounce-input';
import Spinner from '../../components/spinner';
import { Scrollbars } from 'react-custom-scrollbars';
import {AddIcon, RemoveIcon} from '../../components/svgIcons';

class ProductSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      products: [],
      search: ''
    };
    this.pagination = {
      page: 0,
      size: 9,
      total: 0
    };
    this.store = ProductStore;
    this.endpoint = window.config.endpoint; // Get from store
    this.apiKey = window.config.apiKey; // Get from store
  }

  componentDidMount() {
    if (this.props.search) {
      this.searchProduct();
    }
  }

  searchProduct(page) {
    this.setState({isLoading: true});
    page = Number.isInteger(page) ? page : this.pagination.page;
    ShareActor().product().search({query: this.state.search, urlParams: {size: this.pagination.size, page}}, (error, products, res) => {
      this.pagination.total = res.headers['x-pagination-total'];
      this.pagination.page = page;
      this.setState({
        isLoading: false,
        products
      });
    });
  }

  setProductSearch(search) {
    if (search === this.state.search) return;
    this.setState({search});
    this.searchProduct();
  }

  handleSearchSubmit(event) {
    event.preventDefault();
  }

  addProduct(id) {
    console.log('Adding instance');
  }

  removeProduct(id) {
    console.log('Removing instance');
  }

  renderProductItemImg(image_url) {
    if (!image_url) return;

    return (
      <img  src={`${this.endpoint}images/${image_url}?api_key=${this.apiKey}`} alt="product image"/>
    );
  }

  renderProductItems() {
    if (!this.state.products.length) return;
    const children = this.state.products.map((product) => {
      const id = product._id.$oid;
      return (
        <li key={id}>
          <div className="kvass-widget__product-list-item__img">
            {this.renderProductItemImg(product.image_url)}
          </div>
          <span className="kvass-widget__product-list-item__name">{product.name}</span>
          <div className="kvass-widget__product-list-item__toolbar">
            <a href="#" onClick={this.removeProduct(id)}><RemoveIcon className="kvass-widget__svg--red"></RemoveIcon></a>
            <a href="#" onClick={this.addProduct(id)}><AddIcon className="kvass-widget__svg--green"></AddIcon></a>
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

  render() {
    const {search, isLoading} = this.state;
    return (
      <div className="kvass-widget__product-search">
        <div className="kvass-widget__header">
          <form className="kvass-widget__search-form" onSubmit={this.handleSearchSubmit}>
            <DebounceInput
              className="kvass-widget__search-input"
              minLength={0}
              debounceTimeout={300}
              value={search}
              placeholder={T.translate('product.searchPlaceholder')}
              onChange={event => this.setProductSearch(event.target.value)} />
            <input className="kvass-widget__search-button" type="submit" value={T.translate('product.search')} />
          </form>
        </div>
        <div className="kvass-widget__product-list">
          <Spinner show={isLoading}></Spinner>
          {this.renderProductItems()}
        </div>
        <div className="kvass-widget__footer">
          <button className="kvass-widget__next-button">Next</button>
        </div>
      </div>
    );
  }
}

ProductSearch.propTypes = {
};

export default ProductSearch;
