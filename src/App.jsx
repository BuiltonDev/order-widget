import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ProductSearch from './containers/ProductSearch';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const className = classNames({
      'kvass-widget': true,
      'kvass-widget--open': this.props.isOpen,
      'kvass-widget--close': !this.props.isOpen
    });

    return (
      <div id="kvass-widget" className={className}>
        <div className="kvass-widget__overlay"></div>
          <div className="kvass-widget__container">
            <ProductSearch></ProductSearch>
          </div>
      </div>
    )
  }
}

App.propTypes = {
  isOpen: PropTypes.bool
};

export default App;
