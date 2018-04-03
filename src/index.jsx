import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import T from './utils/i18n';
import '../src/styles/index.scss';
import 'babel-polyfill';

let a, e, el;

export const init = ({domElementId, apiKey, endpoint, search='', lng='no', auth0Config}) => {
  new ShareActor({ apiKey, endpoint });
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

// TODO check whether we should destroy shareactor and i18n instance as well so that GC picks them up
export const destroy = () => {
  ReactDOM.unmountComponentAtNode(el);
};
