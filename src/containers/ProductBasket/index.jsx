import React, {Component} from 'react';
import Header from 'src/components/Header';
import Actions from 'src/reflux/Actions';

class ProductBasket extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="product-basket">
        <Header showBackNav={true}>
          
        </Header>
        <div className="kvass-widget__content-body">
          <div className="product-list">

          </div>
          <div className="kvass-widget__content-footer">
          </div>
        </div>
      </div>
    );
  }
}

export default ProductBasket;
