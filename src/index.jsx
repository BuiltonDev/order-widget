import React from 'react';
import ReactDOM from 'react-dom';
import ShareActor from '@shareactor/shareactor-sdk';
import './styles/index.scss';
import App from './App';
import T from './utils/i18n';
import Config from './utils/Config';

let a;
let e;
let el;

export const init = ({domElementId, apiKey, endpoint, lng = 'no', firebaseConfig, stripeApiKey}) => {
  // eslint-disable-next-line no-unused-vars
  const sa = new ShareActor({apiKey, endpoint});
  // eslint-disable-next-line no-unused-vars
  const config = new Config(firebaseConfig, stripeApiKey);
  T.setLanguage(lng);

  el = document.getElementById(domElementId);
  a = apiKey;
  e = endpoint;
  ReactDOM.render(<App apiKey={apiKey} endpoint={endpoint} isOpen={false}/>, el);
};

export const open = () => {
  ReactDOM.render(<App apiKey={a} endpoint={e} isOpen={true}/>, el);
};

export const close = () => {
  // ReactDOM.render(<App apiKey={a} endpoint={e} isOpen={false}/>, el);
  ReactDOM.unmountComponentAtNode(el);
};

// TODO check whether we should destroy shareactor and i18n instance as well
export const destroy = () => {
  delete window.ShareActor;
  delete window.StripeApiKey;
  delete window.FirebaseConfig;
  ReactDOM.unmountComponentAtNode(el);
};
