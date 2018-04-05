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

  componentDidMount() {
    if (this.props.search) {
      this.searchProduct();
    }
  }

  searchProduct(page) {
    this.setState({isLoading: true});
    page = Number.isInteger(page) ? page : this.pagination.page;
    ShareActor().product().search({query: this.state.search, urlParams: {size: this.pagination.size, page}}, (error, productSearchList, res) => {
      this.pagination.total = res.headers['x-pagination-total'];
      this.pagination.page = page;
      this.setState({
        isLoading: false,
        productSearchList
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

  render() {
    const {search, isLoading, globalCount} = this.state;
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
            <input className="kvass-widget__primary-button" type="submit" value={T.translate('product.search')} />
          </form>
        </div>
        <div className="kvass-widget__product-list">
          <Spinner show={isLoading}></Spinner>
          {this.renderProductItems()}
        </div>
        <div className="kvass-widget__footer">
          <ShoppingCart></ShoppingCart>
          {/*<button className="kvass-widget__primary-button">Next</button>*/}
        </div>
      </div>
    );
  }
}

ProductSearch.propTypes = {
};

export default ProductSearch;
