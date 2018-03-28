import Reflux from 'reflux';

const Actions = Reflux.createActions([
  'setLastProduct',
  'addOneProduct',
  'removeLastProduct',
  'removeProduct',
  'setStore',
  'setOrder',
  'setUser',
]);

export default Actions;
