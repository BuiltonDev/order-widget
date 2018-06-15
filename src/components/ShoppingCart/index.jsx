import React from 'react';
import Reflux from 'reflux';
import NotificationBadge from 'react-notification-badge';
import classNames from 'classnames';
import ShoppingCartIcon from 'src/components/SvgIcons/ShoppingCartIcon';
import ProductStore from 'src/reflux/ProductStore';
import Actions from 'src/reflux/Actions';

const badgeEffect = ['scale(1.4, 1.4)', 'scale(1, 1)'];

class ShoppingCart extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = ProductStore;
    this.storeKeys = ['totalCount'];
    this.onShoppingCartClick = this.onShoppingCartClick.bind(this);
  }

  onShoppingCartClick() {
    if (this.state.totalCount) {
      Actions.onNavigateTo(1); // To basket
    }
  }

  render() {
    const {totalCount} = this.state;
    const className = classNames({
      'svg-icon--primary': true,
      'svg-icon--disabled': !totalCount
    });

    return (
      <a href="#" className="shopping-cart" onClick={this.onShoppingCartClick}>
        <ShoppingCartIcon className={className}></ShoppingCartIcon>
        <NotificationBadge style={{backgroundColor: '#FF7700', position: 'absolute', top: 0, right: 0, borderRadius: '50%', padding: '3px 5px', minWidth: 'auto', fontSize: 10, border: '2px solid #fff'}} count={totalCount} effect={badgeEffect} frameLength={15.0}/>
      </a>
    );
  }
};

export default ShoppingCart;
