import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {DebounceInput} from 'react-debounce-input';
import Animate from 'src/utils/animate';

class BasketList extends Component {
  constructor(props) {
    super(props);
    this.items = props.products;
    this.animation = new Animate();
  }

  onChange(product, event) {
    if (this.props.isCountChangeEnabled) this.props.onCountChange(product, event);
  }

  componentDidMount() {
    if (this.props.products) {
      const items = document.getElementsByClassName('in-page-transition');
      const itemsArray = [].slice.call(items);
      this.animation.animate(itemsArray);
    }
  }

  renderBasketPrice(product) {
    const key = `${product.item._id.$oid}-1`;
    return (
      <li key={key} className='product-basket--item in-page-transition'>
        <div className="basket-item__title">{product.item.name}</div>
        <div className='product-basket--item-content'>
          <span className="basket-item__count">
            <DebounceInput
              className="basket-item__count-input"
              minLength={1}
              debounceTimeout={500}
              value={product.count}
              disabled={!this.props.isCountChangeEnabled}
              onChange={event => this.onChange(product, event)} />
          </span>
          <span className="basket-item__price">{product.item.price} {product.item.currency}</span>
          <span className="basket-item__total">{product.item.price * product.count} {product.item.currency}</span>
        </div>
      </li>
    );
  }

  renderBasketOneLine(product) {
    return (
      <li key={product.item._id.$oid} className='in-page-transition'>
        <span className="basket-item__count">
          <DebounceInput
            className="basket-item__count-input"
            minLength={1}
            debounceTimeout={500}
            value={product.count}
            disabled={!this.props.isCountChangeEnabled}
            onChange={event => this.onChange(product, event)} />
        </span>
        <span className="basket-item__title">{product.item.name}</span>
        <span className="basket-item__total">{product.item.price * product.count} {product.item.currency}</span>
      </li>
    );
  }

  render() {
    const productArray = [];
    let className = 'basket-list';

    if (this.props.className) className += ' ' + this.props.className;

    this.items = document.getElementsByClassName('in-page-transition');

    Object.entries(this.props.products).forEach(([key, value]) => {
      if (value) {

        if (this.props.onOneLine) {
          productArray.push(this.renderBasketOneLine(value));
        } else {
          productArray.push(this.renderBasketPrice(value));
        }

      }
    });

    return (
      <ul className={className}>
        {productArray}
      </ul>
    )
  }
}

BasketList.defaultProps = {
  isCountChangeEnabled: true,
  onOneLine: false
};

BasketList.propTypes = {
  products: PropTypes.object.isRequired,
  isCountChangeEnabled: PropTypes.bool,
  onCountChange: PropTypes.func,
  onOneLine: PropTypes.bool,
  classOverride: PropTypes.string
};

export default BasketList;
