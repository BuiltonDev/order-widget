import Reflux from 'reflux';

const Actions = Reflux.createActions([
  'onAddProduct', // Product
  'onRemoveProduct', // Product
  'onInitNavigation', // Nav
  'onPreviousNavigation', // Nav
  'onNextNavigation', // Nav
  'onUserDetailsInput', // User
  'onSendSms', // User
  'onVerifyCode', // User
  'onDateChange', // Delivery
  'onTimeChange', // Delivery
  'onAddressChange', // Delivery
  'onGetAddressFromGoogle' // Delivery
]);

export default Actions;
