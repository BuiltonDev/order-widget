import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Kvass from '@kvass.ai/core-sdk';
import ProductImage from 'src/components/ProductImage';
import Spinner from 'src/components/Spinner';
import Actions from 'src/reflux/Actions';
import utils from 'src/utils';

class ProductRecommendations extends Component {
  static onProductClick(product) {
    Actions.onSelectProduct(product);
    Actions.onNavigateTo(7); // Navigate to product page
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      recommendations: [],
      visibleRecIndex: 3, // endIndex of what we are showing from array
      size: 9 // no pagination on recommendations
    };
    this.kvass = new Kvass();
  }

  componentDidMount() {
    const body = {
      model_type: this.props.modelType,
      source_id: this.props.sourceId,
      source: this.props.source,
      destination: this.props.destination,
      size: this.state.size
    };
    this.kvass.aiModel().getRecommendations({body, urlParams: {expand: 'response.object'}}, (error, recommendations, res) => {
      if (error) {
        this.setState({isLoading: false, recommendations: []});
        return;
      }
      this.setState({
        isLoading: false,
        recommendations: utils.parseRecommendations(recommendations)
      });
    });
  }

  onNavigateRecommendations(direction) {
    if (!direction) return;
    let newVisibleIndex = this.state.visibleRecIndex;
    this.setState({isLoading: true});

    if (direction === 'back') {
      newVisibleIndex -= 3;
    } else if (direction === 'forward') {
      newVisibleIndex += 3;
    }

    setTimeout(() => {
      this.setState({
        visibleRecIndex:
          (newVisibleIndex >= 3 && newVisibleIndex <= this.state.size) ? newVisibleIndex : 3,
        isLoading: false
      });
    }, 500);
  }

  renderRecommendationItem(product) {
    return (
      <li
        key={product._id.$oid}
        className="recommendation__item"
        onClick={() => this.constructor.onProductClick(product)}
      >
        <ProductImage
          imageUrl={product.image_url}
          apiKey={this.kvass.apiKey}
          endpoint={this.kvass.endpoint}
        />
        <span className="title">
          {product.name}
        </span>
      </li>
    );
  }

  renderLeftNavButton() {
    return (
      <div className="recommendation-nav">
        <a
          className="recommendation-nav__backward"
          href="#"
          onClick={
            () => this.onNavigateRecommendations('back')
          }
        >
          &#8249;
        </a>
      </div>
    );
  }

  renderRightNavButton() {
    return (
      <div className="recommendation-nav">
        <a
          className="recommendation-nav__forward"
          href="#"
          onClick={
            () => this.onNavigateRecommendations('forward')}
        >
          &#8250;
        </a>
      </div>
    );
  }

  render() {
    const {recommendations, visibleRecIndex, isLoading} = this.state;
    const {customClass} = this.props;

    const children = recommendations.slice(visibleRecIndex - 3, visibleRecIndex)
      .map(product => this.renderRecommendationItem(product));

    return (
      <div className={`recommendations ${customClass}`}>
        {this.renderLeftNavButton()}
        <div className="recommendations-list">
          <Spinner show={isLoading} showOverlay={false} />
          <span className="recommendation__title">
            {this.props.title}:
          </span>
          <ul>
            {children}
          </ul>
        </div>
        {this.renderRightNavButton()}
      </div>
    );
  }
}

ProductRecommendations.defaultProps = {
  title: 'Recommendations',
  source: 'product',
  destination: 'product',
  customClass: ''
};

ProductRecommendations.propTypes = {
  title: PropTypes.string,
  modelType: PropTypes.string.isRequired,
  sourceId: PropTypes.string.isRequired,
  source: PropTypes.string,
  destination: PropTypes.string,
  customClass: PropTypes.string
};

export default ProductRecommendations;
