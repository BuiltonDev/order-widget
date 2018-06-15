import Reflux from 'reflux';

const Actions = Reflux.createActions([
  'onMessage', // Global
  'onCloseMessage', // Global
  'onGlobalReset', // Global. Calls all other store reset
  'onInitNavigation', // Nav
  'onPreviousNavigation', // Nav
  'onNextNavigation', // Nav
  'onNavigateTo', // Nav
  'onNavigationReset', // Nav
  'onAddProduct', // Product
  'onRemoveProduct', // Product
  'onSelectProduct', // Product
  'onProductReset', // Product
  'onAuthStateChanged', // User
  'onUserDetailsInput', // User
  'onAuthenticateUser', // User
  'onUserRemoveAuth', // User
  'onUserReset', // User
  'onDateChange', // Delivery
  'onTimeChange', // Delivery
  'onAddressChange', // Delivery
  'onAdditionalDetailsChange', // Delivery
  'onGetAddressFromGoogle', // Delivery
  'onDeliveryReset', // Delivery
  'onStripeToken', // Payment
  'onSelectPaymentMethod', // Payment
  'onAddUserPaymentMethods', // Payment
  'onPaymentReset' // Payment
]);

export default Actions;
