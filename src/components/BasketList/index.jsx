import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DebounceInput} from 'react-debounce-input';
import Animate from 'src/utils/animate';
import utils from 'src/utils';

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
      this.animation.animateInViewTransition();
    }
  }

  mapBasketLines() {
    const productArray = [];

    Object.values(this.props.products).forEach((value) => {
      if (value) {
        if (this.props.onOneLine) {
          productArray.push(this.renderBasketOneLine(value));
        } else {
          productArray.push(this.renderBasketPrice(value));
        }
      }
    });

    return productArray;
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
          <span className="basket-item__total">{utils.roundNumber(product.item.price * product.count, 2)} {product.item.currency}</span>
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
        <span className="basket-item__total">{utils.roundNumber(product.item.price * product.count, 2)} {product.item.currency}</span>
      </li>
    );
  }

  render() {
    return (
      <ul className={`basket-list ${this.props.className}`}>
        {this.mapBasketLines()}
      </ul>
    );
  }
}

BasketList.defaultProps = {
  isCountChangeEnabled: true,
  onOneLine: false,
  className: ''
};

BasketList.propTypes = {
  products: PropTypes.object.isRequired,
  isCountChangeEnabled: PropTypes.bool,
  onCountChange: PropTypes.func,
  onOneLine: PropTypes.bool,
  classOverride: PropTypes.string,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ])
};

export default BasketList;
