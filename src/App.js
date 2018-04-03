import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Actions from './reflux/Actions';

import ProductSearch from './containers/ProductSearch';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let openClass = '';
    if (this.props.isOpen === true) openClass = ' kvass-widget--open';
    if (this.props.isOpen === false) openClass = ' kvass-widget--close';
    console.log(openClass);
    return (
      <div id="kvass-widget" className={"kvass-widget" + openClass}>
        <div className="kvass-widget__overlay"></div>
          <div className="kvass-widget__container">
            <ProductSearch></ProductSearch>
          </div>
      </div>
    )
  }
}

App.propTypes = {
  endpoint: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
};

export default App;
