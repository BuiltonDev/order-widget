import React from 'react';
import Reflux from 'reflux';
import PlacesAutocomplete from 'react-places-autocomplete';
import T from 'src/utils/i18n';
import Actions from 'src/reflux/Actions';
import DeliveryStore from 'src/reflux/DeliveryStore';

class PlaceAutoCompleteWrapper extends Reflux.Component {
  static renderSuggestion({formattedSuggestion}) {
    return (
      <div>
        <strong>
          {formattedSuggestion.mainText}
        </strong>
        {' '}
        <small>
          {formattedSuggestion.secondaryText}
        </small>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.store = DeliveryStore;
    this.storeKeys = ['deliveryAddress', 'retrievedGeo'];

    this.classNames = {
      root: 'place-auto-complete',
      input: 'kvass-widget__input',
      autocompleteContainer: 'container'
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.retrievedGeo)Actions.onGetAddressFromGoogle(this.state.address);
  }

  render() {
    const inputProps = {
      value: this.state.deliveryAddress,
      onChange: Actions.onAddressChange,
      type: 'search',
      placeholder: T.translate('deliveryDetails.searchPlacesPlaceholder'),
      autoFocus: true
    };

    return (
      <form className="kvass-widget__input-container" onSubmit={this.handleFormSubmit}>
        <PlacesAutocomplete
          classNames={this.classNames}
          inputProps={inputProps}
          renderSuggestion={this.constructor.renderSuggestion}
          onSelect={
            address => Actions.onGetAddressFromGoogle(address)
          }
          onEnterKeyDown={
            address => Actions.onGetAddressFromGoogle(address)
          } />
        <button className="kvass-widget__secondary-button" type="submit">
          {T.translate('global.select')}
        </button>
      </form>
    );
  }
}

export default PlaceAutoCompleteWrapper;
