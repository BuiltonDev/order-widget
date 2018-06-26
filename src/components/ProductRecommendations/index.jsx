import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Kvass from '@kvass.ai/core-sdk';
import T from 'src/utils/i18n';
import ProductImage from 'src/components/ProductImage';

class ProductRecommendations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      recommendations: [],
      visibleRecIndex: 3, // endIndex of what we are showing from array
      size: 20 // no pagination on recommendations
    };
    this.kvass = new Kvass();
  }

  componentDidMount() {
    const body = {model_type: this.props.modelType, source: this.props.source, destination: this.props.destination};
    const urlParams = {urlParams: {size: this.props.size};
    kvass.aiModel().getRecommendations({body, urlParams}, (error, recommendations, res) => {
      if (error) {
        this.setState({isLoading: false});
      }
      this.setState({isLoading: false, recommendations: recommendations.response});
    });
  }

  onNavigateRecommendations(direction) {
    if (!direction) return;

    let newVisibleIndex = visibleRecIndex;

    if (direction === 'back') {
      newVisibleIndex -= 3;
    } else if (direction === 'forward') {
      newVisibleIndex += 3;
    }

    this.setState({visibleRecIndex: newVisibleIndex > -1 && newVisibleIndex < this.props.size ? newVisibleIndex : 0});
  }

  renderRecommendationItem(product) {
    return (
      <li className="recommendation__item">
        <ProductImage imageUrl={product.image_url} apiKey={this.kvass.apiKey} endpoint={this.kvass.endpoint} />
        <span className="title"></span>
      </li>
    );
  }

  render() {
    const {recommendations, onLeftNav, onRightNav} = this.props;
    const children = recommendations.map((product) => renderRecommendationItem(product));
    return (
      <div className="recommendation">
        <span className="recommendation__title">{T.translate('recommendations.title')}</span>
        <div className="recommendations-list">
          <a className="recommendation-nav__back" href="#" onClick={this.onNavigateRecommendations('back')}>&laquo;</a>
          <ul>
            {children}
          </ul>
          <a className="recommendation-nav__forward" href="#" onClick={this.onNavigateRecommendations('forward')}>&raquo;</a>
        </div>
      </div>
    );
  }
}

ProductList.defaultProps = {
  source: 'product' ,
  destination: 'product'
};

ProductRecommendations.propTypes = {
  modelType: PropTypes.string.isRequired,
  source: PropTypes.string,
  destination: PropTypes.string
};

export ProductRecommendations;
