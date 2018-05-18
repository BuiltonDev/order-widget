import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {DebounceInput} from 'react-debounce-input';

class BasketList extends Component {
  constructor(props) {
    super(props);
  }

  renderBasketItem(product) {
    const addedKey = `${product.item._id.$oid}-1`;
    return (
      <li key={product.item._id.$oid}>
        <span className="basket-item__title">{product.item.name}</span>
      </li>
    );
  }

  renderBasketPrice(product) {
    const addedKey = `${product.item._id.$oid}-1`;
    return (
      <li key={addedKey}>
        <span className="basket-item__count">
          <DebounceInput
            className="basket-item__count-input"
            minLength={1}
            debounceTimeout={500}
            value={product.count}
            onChange={event => this.props.onCountChange(product, event)} />
        </span>
        <span className="basket-item__price">{product.item.price} {product.item.currency}</span>
        <span className="basket-item__total">{product.item.price * product.count} {product.item.currency}</span>
      </li>
    );
  }

  render() {
    const productArray = [];
    let currency = ''

    Object.entries(this.props.products).forEach(([key, value]) => {
      if (value) {

        if (!currency) currency = value.item.currency; // TODO better solution in the future here for currency

        productArray.push(this.renderBasketItem(value));
        productArray.push(this.renderBasketPrice(value));
      }
    });

    return (
      <ul className="basket-list">
        {productArray}
      </ul>
    )
  }
}

BasketList.propTypes = {
  products: PropTypes.object.isRequired,
  onCountChange: PropTypes.func.isRequired
};

export default BasketList;
