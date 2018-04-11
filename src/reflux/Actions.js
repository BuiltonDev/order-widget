import Reflux from 'reflux';

const Actions = Reflux.createActions([
  'onAddProduct', // Product store
  'onRemoveProduct', // Product store
  'onInitNavigation', // Nav store
  'onPreviousNavigation', // Nav store
  'onNextNavigation', // Nav store
  'onUserDetailsInput', // User store
  'onSendSms', // User store
  'onVerifyCode' // User store
]);

export default Actions;
