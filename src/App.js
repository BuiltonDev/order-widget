import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Actions from './reflux/Actions';

import ProductSearch from './containers/ProductSearch';

class App extends Component {
  constructor(props) {
    super(props);
    this.endpoint = props.endpoint;
    this.apiKey = props.apiKey;
  }

  render() {
    return (
      <div id={'sa-widget--nav-container'} className="sa-widget fade-in">
      <ProductSearch></ProductSearch>
      </div>
    )
  }
}

App.propTypes = {
  endpoint: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
};

export default App;
