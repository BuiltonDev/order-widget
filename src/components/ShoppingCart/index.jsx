import React from 'react';
import Reflux from 'reflux';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import ShoppingCartIcon from 'src/components/SvgIcons/ShoppingCartIcon';
import ProductStore from 'src/reflux/ProductStore';
import Actions from 'src/reflux/Actions';

class ShoppingCart extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = ProductStore;
    this.storeKeys = ['globalCount'];
  }

  render() {
    const {globalCount} = this.state;
    return (
      <div className="shopping-cart" onClick={() => Actions.onNextNavigation()}>
        <ShoppingCartIcon className="svg-icon--primary"></ShoppingCartIcon>
        <NotificationBadge style={{'backgroundColor': '#FF7700'}} count={globalCount} effect={Effect.SCALE} frameLength={15.0}/>
      </div>
    );
  }
};

export default ShoppingCart;
