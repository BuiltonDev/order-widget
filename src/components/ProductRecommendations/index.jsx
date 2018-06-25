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
      recommendations: []
    };
    this.kvass = new Kvass();
  }

  onNavigateRecommendations(direction) {

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

ProductRecommendations.propTypes = {
  modelType: PropTypes.string.isRequired
};

export ProductRecommendations;
