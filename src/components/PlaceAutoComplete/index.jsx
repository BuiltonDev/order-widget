import React, {Component} from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import T from 'src/utils/i18n';

class PlaceAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      retrievedGeo: '',
      lat: null,
      lng: null
    };
    this.onChange = this.onChange.bind(this);
    this.getAddress = this.getAddress.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  onChange(address) {
    this.setState({address});
  }

  getAddress(address) {
    if (this.state.address !== address) this.setState({address});

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({retrievedGeo: address, ...latLng});
      })
      .catch(error => console.error('Error', error));
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.retrievedGeo !== this.state.address) this.getAddress(this.state.address);
  }


  renderSuggestion({formattedSuggestion}) {
    return (
      <div>
        <i/>
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small>{formattedSuggestion.secondaryText}</small>
      </div>
    );
  }


  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
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
        <PlacesAutocomplete classNames={classNames} inputProps={inputProps} renderSuggestion={this.renderSuggestion} onSelect={this.getAddress} onEnterKeyDown={this.getAddress}/>
        <button className="kvass-widget__primary-button" type="submit">{T.translate('global.select')}</button>
      </form>
    )
  }
}

export default PlaceAutoComplete;
