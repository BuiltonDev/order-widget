import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Kvass from '@kvass.ai/core-sdk';
import T from 'src/utils/i18n';
import ProductImage from 'src/components/ProductImage';
import Spinner from 'src/components/Spinner';

const MOCK_RECOMMENDATIONS = [{"active": true, "company": {"$oid": "5ad0953c9a5d09000629d6c0"}, "tags": [], "currency": "GBP", "short_description": "23382", "properties": {}, "parents": [], "price": 3.75, "vat": 0.0, "image_url": "5b0bf94fd76d432a8ab15e9e/174ebf1999885875dbe528241f395ae1.jpg", "_sub_products": [], "_cls": "Product", "created": {"$date": 1523627866982}, "modified": {"$date": 1527511375812}, "_id": {"$oid": "5ad0b782d76d432722a7594b"}, "company_take": -1.0, "business_rules": [], "deleted": false, "price_change_percentage": 0.0, "name": "BOX OF 6 CHRISTMAS CAKE DECORATIONS", "default_position": [-1, -1], "main_product": true, "max_distance": 0, "path": "/"}, {"active": true, "company": {"$oid": "5ad0953c9a5d09000629d6c0"}, "tags": [], "currency": "GBP", "short_description": "23074", "properties": {}, "parents": [], "price": 2.08, "vat": 0.0, "image_url": "5afc2c4dd76d43f9c3b4d356/07043cce771f6bc8ab9dba6ef21a7c86.jpg", "_sub_products": [], "_cls": "Product", "created": {"$date": 1523627847285}, "modified": {"$date": 1526475853669}, "_id": {"$oid": "5ad0b782d76d432722a758e1"}, "company_take": -1.0, "business_rules": [], "deleted": false, "price_change_percentage": 0.0, "name": "EMBOSSED HEART TRINKET BOX", "default_position": [-1, -1], "main_product": true, "max_distance": 0, "path": "/"}, {"active": true, "company": {"$oid": "5ad0953c9a5d09000629d6c0"}, "tags": [], "currency": "GBP", "short_description": "23413", "properties": {}, "parents": [], "price": 4.95, "vat": 0.0, "image_url": "5b0bf99dd76d432a8ab15efb/31a1cfbb592e401b004bcbffde3f2fa4.jpg", "_sub_products": [], "_cls": "Product", "created": {"$date": 1523627846132}, "modified": {"$date": 1527511454185}, "_id": {"$oid": "5ad0b782d76d432722a758d0"}, "company_take": -1.0, "business_rules": [], "deleted": false, "price_change_percentage": 0.0, "name": "VINTAGE COFFEE GRINDER BOX", "default_position": [-1, -1], "main_product": true, "max_distance": 0, "path": "/"}, {"active": true, "company": {"$oid": "5ad0953c9a5d09000629d6c0"}, "tags": [], "currency": "GBP", "short_description": "23414", "properties": {}, "parents": [], "price": 9.95, "vat": 0.0, "image_url": "5b0bf9a0d76d432a8ab15efe/18482bdda01d954bde4f90f2259b4abb.jpg", "_sub_products": [], "_cls": "Product", "created": {"$date": 1523627845104}, "modified": {"$date": 1527511457455}, "_id": {"$oid": "5ad0b782d76d432722a758c0"}, "company_take": -1.0, "business_rules": [], "deleted": false, "price_change_percentage": 0.0, "name": "ZINC BOX SIGN HOME", "default_position": [-1, -1], "main_product": true, "max_distance": 0, "path": "/"}, {"active": true, "company": {"$oid": "5ad0953c9a5d09000629d6c0"}, "tags": [], "currency": "GBP", "short_description": "23424", "properties": {}, "parents": [], "price": 4.95, "vat": 0.0, "image_url": "5b0bf9bed76d432a8ab15f1d/Gingham-Recipe-Book-Storage-Box.jpg", "_sub_products": [], "_cls": "Product", "created": {"$date": 1523627845099}, "modified": {"$date": 1527511486644}, "_id": {"$oid": "5ad0b782d76d432722a758be"}, "company_take": -1.0, "business_rules": [], "deleted": false, "price_change_percentage": 0.0, "name": "GINGHAM RECIPE BOOK BOX", "default_position": [-1, -1], "main_product": true, "max_distance": 0, "path": "/"}, {"active": true, "company": {"$oid": "5ad0953c9a5d09000629d6c0"}, "tags": [], "currency": "GBP", "short_description": "35645", "properties": {}, "parents": [], "price": 4.25, "vat": 0.0, "image_url": "5b0bfc1fd76d432a8ab161a1/e2f405a5ff8cd02611707efa5cfcde34.jpg", "_sub_products": [], "_cls": "Product", "created": {"$date": 1523627826384}, "modified": {"$date": 1527512096020}, "_id": {"$oid": "5ad0b782d76d432722a75845"}, "company_take": -1.0, "business_rules": [], "deleted": false, "price_change_percentage": 0.0, "name": "VINTAGE BEAD PINK JEWEL BOX", "default_position": [-1, -1], "main_product": true, "max_distance": 0, "path": "/"}, {"active": true, "company": {"$oid": "5ad0953c9a5d09000629d6c0"}, "tags": [], "currency": "GBP", "short_description": "23319", "properties": {}, "parents": [], "price": 2.49, "vat": 0.0, "image_url": "5b0bf891d76d432a8ab15de6/Box-of-6-Mini-Tom-Smith-Luxury-Christmas.jpg", "_sub_products": [], "_cls": "Product", "created": {"$date": 1523627825381}, "modified": {"$date": 1527511186155}, "_id": {"$oid": "5ad0b782d76d432722a7583b"}, "company_take": -1.0, "business_rules": [], "deleted": false, "price_change_percentage": 0.0, "name": "BOX OF 6 MINI 50'S CRACKERS", "default_position": [-1, -1], "main_product": true, "max_distance": 0, "path": "/"}, {"active": true, "company": {"$oid": "5ad0953c9a5d09000629d6c0"}, "tags": [], "currency": "GBP", "short_description": "23318", "properties": {}, "parents": [], "price": 2.49, "vat": 0.0, "image_url": "5b0bf88ed76d432a8ab15de3/5446b49acfb13d36fc38a7450bbea0ec.jpg", "_sub_products": [], "_cls": "Product", "created": {"$date": 1523627825378}, "modified": {"$date": 1527511183272}, "_id": {"$oid": "5ad0b782d76d432722a7583a"}, "company_take": -1.0, "business_rules": [], "deleted": false, "price_change_percentage": 0.0, "name": "BOX OF 6 MINI VINTAGE CRACKERS", "default_position": [-1, -1], "main_product": true, "max_distance": 0, "path": "/"}, {"active": true, "company": {"$oid": "5ad0953c9a5d09000629d6c0"}, "tags": [], "currency": "GBP", "short_description": "20901", "properties": {}, "parents": [], "price": 6.35, "vat": 0.0, "image_url": "5afa9297d76d430d89223900/maxresdefault.jpg", "_sub_products": [], "_cls": "Product", "created": {"$date": 1523627817397}, "modified": {"$date": 1526370967668}, "_id": {"$oid": "5ad0b782d76d432722a757dc"}, "company_take": -1.0, "business_rules": [], "deleted": false, "price_change_percentage": 0.0, "name": "VINTAGE KEEPSAKE BOX PINK FLOWER", "default_position": [-1, -1], "main_product": true, "max_distance": 0, "path": "/"}, {"active": true, "company": {"$oid": "5ad0953c9a5d09000629d6c0"}, "tags": [], "currency": "GBP", "short_description": "84711B", "properties": {}, "parents": [], "price": 9.95, "vat": 0.0, "image_url": "5b0fbc8bd76d432cb7cf25dc/906e2565dbe43e01917d3f4021b65af0.jpg", "_sub_products": [], "_cls": "Product", "created": {"$date": 1523627813944}, "modified": {"$date": 1527757964442}, "_id": {"$oid": "5ad0b782d76d432722a75794"}, "company_take": -1.0, "business_rules": [], "deleted": false, "price_change_percentage": 0.0, "name": "PINK OVAL SHAPE TRINKET BOX", "default_position": [-1, -1], "main_product": true, "max_distance": 0, "path": "/"}];

class ProductRecommendations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      recommendations: [],
      visibleRecIndex: 3, // endIndex of what we are showing from array
      size: 9 // no pagination on recommendations
    };
    this.kvass = new Kvass();
  }

  componentDidMount() {
    const body = {model_type: this.props.modelType, source_id: this.props.sourceId, source: this.props.source, destination: this.props.destination, size: this.state.size};
    this.setState({isLoading: true});
    /*
    this.kvass.aiModel().getRecommendations({body}, (error, recommendations, res) => {
      if (error) {
        this.setState({isLoading: false, recommendations: []});
        return;
      }
      this.setState({isLoading: false, recommendations: recommendations.response});
    });*/
    setTimeout(() => {
      this.setState({recommendations: MOCK_RECOMMENDATIONS, isLoading: false});
    }, 500);
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
        visibleRecIndex: (newVisibleIndex > -1 && newVisibleIndex) < this.state.size ? newVisibleIndex : 3,
        isLoading: false
      });
    }, 500);
  }

  renderRecommendationItem(product) {
    return (
      <li key={product._id.$oid} className="recommendation__item">
        <ProductImage imageUrl={product.image_url} apiKey={this.kvass.apiKey} endpoint={this.kvass.endpoint} />
        <span className="title">{product.name}</span>
      </li>
    );
  }

  render() {
    const {recommendations, visibleRecIndex, isLoading} = this.state;
    if (!recommendations.length) return null;
    const children = recommendations.slice(visibleRecIndex - 3, visibleRecIndex).map((product) => this.renderRecommendationItem(product));
    return (
      <div className="recommendations">
        <div className="recommendation-nav">
          <a className="recommendation-nav__backward" href="#" onClick={(ev) => this.onNavigateRecommendations('back')}>&#8249;</a>
        </div>
        <div className="recommendations-list">
          <Spinner show={isLoading}></Spinner>
          <span className="recommendation__title">{T.translate('recommendations.title')}</span>
          <ul>
            {children}
          </ul>
        </div>
        <div className="recommendation-nav">
          <a className="recommendation-nav__forward" href="#" onClick={(ev) => this.onNavigateRecommendations('forward')}>&#8250;</a>
        </div>
      </div>
    );
  }
}

ProductRecommendations.defaultProps = {
  source: 'product' ,
  destination: 'product'
};

ProductRecommendations.propTypes = {
  modelType: PropTypes.string.isRequired,
  sourceId: PropTypes.string.isRequired,
  source: PropTypes.string,
  destination: PropTypes.string
};

export default ProductRecommendations;
