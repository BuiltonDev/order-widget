import Reflux from 'reflux';

const Actions = Reflux.createActions([
  'onInitNavigation', // Nav
  'onPreviousNavigation', // Nav
  'onNextNavigation', // Nav
  'onNavigateTo', // Nav
  'onAddProduct', // Product
  'onRemoveProduct', // Product
  'onAuthStateChanged', // User
  'onUserDetailsInput', // User
  'onAuthenticateUser', // User
  'onResetAuth', // User
  'onDateChange', // Delivery
  'onTimeChange', // Delivery
  'onAddressChange', // Delivery
  'onAdditionalDetailsChange', // Delivery
  'onGetAddressFromGoogle', // Delivery
  'onStripeToken', // Payment
  'onSelectPaymentMethod' // Payment
]);

export default Actions;
