import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import T from './utils/i18n';
import '../src/styles/index.scss';

let a;
let e;
let el;

export const init = ({domElementId, apiKey, endpoint, lng = 'no', auth0Config, stripeApiKey}) => {
  // eslint-disable-next-line no-undef
  window.ShareActor = ShareActor ? new ShareActor({apiKey, endpoint}) : null;
  window.Auth0Config = auth0Config;
  window.StripeApiKey = stripeApiKey;
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
  ReactDOM.render(<App apiKey={a} endpoint={e} isOpen={false}/>, el);
};

// TODO check whether we should destroy shareactor and i18n instance as well
export const destroy = () => {
  delete window.ShareActor;
  delete window.Auth0Config;
  delete window.StripeApiKey;
  ReactDOM.unmountComponentAtNode(el);
};
