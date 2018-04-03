import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ProductSearch extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="kvass-widget__product-search">
        <div>Product Search</div>
      </div>
    )
  }
}

ProductSearch.propTypes = {
};

export default ProductSearch;
