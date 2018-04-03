import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Reflux from 'reflux';
import ProductStore from '../../reflux/ProductStore';
import T from '../../utils/i18n';
import {ShareActor} from '../../utils';
import {DebounceInput} from 'react-debounce-input';

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

  renderProductItems() {
    if (!this.state.products.length) return;
    return this.state.products.map((product) => <li key={product._id.$oid}>{product.name}</li>);
  }

  render() {
    const {search} = this.state;
    return (
      <div className="kvass-widget__product-search">
        <div className="kvass-widget__header">
          <form className="kvass-widget__search-form" onSubmit={this.handleSearchSubmit}>
            <DebounceInput
              minLength={0}
              debounceTimeout={300}
              value={search}
              placeholder={T.translate('product.searchPlaceholder')}
              onChange={event => this.setProductSearch(event.target.value)} />
            <input className="kvass-widget__search-button" type="submit" value="Submit" />
          </form>
        </div>
        <div className="kvass-widget__product-list">
          <ul>
            {this.renderProductItems()}
          </ul>
        </div>
      </div>
    );
  }
}

ProductSearch.propTypes = {
};

export default ProductSearch;
