import React from 'react'
import Reflux from 'reflux'
import PlacesAutocomplete from 'react-places-autocomplete'
import T from 'src/utils/i18n';
import Actions from 'src/reflux/Actions';
import DeliveryStore from 'src/reflux/DeliveryStore';

class PlaceAutoCompleteWrapper extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = DeliveryStore;
    this.storeKeys = ['deliveryAddress', 'retrievedGeo'];

    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.retrievedGeo) Actions.getAddressFromGoogle(this.state.address);
  }

  renderSuggestion({formattedSuggestion}) {
    return (
      <div>
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small>{formattedSuggestion.secondaryText}</small>
      </div>
    );
  }

  render() {
    const inputProps = {
      value: this.state.deliveryAddress,
      onChange: Actions.onAddressChange,
      type: 'search',
      placeholder: T.translate('deliveryDetails.searchPlacesPlaceholder'),
      autoFocus: true
    };

    const classNames = {
      root: 'place-auto-complete',
      input: 'kvass-widget__input',
      autocompleteContainer: 'container'
    };

    return (
      <form className="kvass-widget__input-container" onSubmit={this.handleFormSubmit}>
        <PlacesAutocomplete
          classNames={classNames}
          inputProps={inputProps}
          renderSuggestion={this.renderSuggestion}
          onSelect={(address) => Actions.onGetAddressFromGoogle(address)}
          onEnterKeyDown={(address) => Actions.onGetAddressFromGoogle(address)} />
        <button className="kvass-widget__primary-button" type="submit">{T.translate('global.select')}</button>
      </form>
    )
  }
}

export default PlaceAutoCompleteWrapper;
