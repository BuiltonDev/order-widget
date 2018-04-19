import Reflux from 'reflux';

const Actions = Reflux.createActions([
  'onAddProduct', // Product
  'onRemoveProduct', // Product
  'onInitNavigation', // Nav
  'onPreviousNavigation', // Nav
  'onNextNavigation', // Nav
  'onAuthStateChanged', // User
  'onApiAuth', // User
  'onDateChange', // Delivery
  'onTimeChange', // Delivery
  'onAddressChange', // Delivery
  'onAdditionalDetailsChange', // Delivery
  'onGetAddressFromGoogle' // Delivery
]);

export default Actions;
