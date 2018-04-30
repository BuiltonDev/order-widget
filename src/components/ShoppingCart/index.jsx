import React from 'react';
import Reflux from 'reflux';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import classNames from 'classnames';
import ShoppingCartIcon from 'src/components/SvgIcons/ShoppingCartIcon';
import ProductStore from 'src/reflux/ProductStore';
import Actions from 'src/reflux/Actions';

class ShoppingCart extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = ProductStore;
    this.storeKeys = ['totalCount'];
    this.onShoppingCartClick = this.onShoppingCartClick.bind(this);
  }

  onShoppingCartClick() {
    if (this.state.totalCount) {
      Actions.onNextNavigation();
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
        <NotificationBadge style={{'backgroundColor': '#FF7700', position: 'relative'}} count={totalCount} effect={Effect.SCALE} frameLength={15.0}/>
      </a>
    );
  }
};

export default ShoppingCart;
