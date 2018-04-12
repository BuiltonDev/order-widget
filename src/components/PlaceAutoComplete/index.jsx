import React, {Component} from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class PlaceAutoComplete extends Component {
  constructor(props) {
    super(props)
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
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({retrievedGeo: address, ...latLng});
        console.log('Success', latLng);
      })
      .catch(error => console.error('Error', error));
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.retrievedGeo !== this.state.address) this.getAddress(this.state.address);
  }


  renderSuggestion({formattedSuggestion}) {
    return (
      <div className="Demo__suggestion-item">
        <i className="fa fa-map-marker Demo__suggestion-icon" />
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text-muted">{formattedSuggestion.secondaryText}</small>
      </div>
    );
  }


  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      type: 'search',
      placeholder: 'Search Places...',
      autoFocus: true
    };

    const classNames = {
      root: 'place-auto-complete',
      input: ''
    };

    return (
      <form onSubmit={this.handleFormSubmit}>
        <PlacesAutocomplete classNames={classNames} inputProps={inputProps} renderSuggestion={this.renderSuggestion} onSelect={this.getAddress} onEnterKeyDown={this.getAddress}/>
        <button className="kvass-widget__primary-button" type="submit">Select</button>
      </form>
    )
  }
}

export default PlaceAutoComplete;
