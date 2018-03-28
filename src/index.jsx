import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import T from './utils/i18n';
import '../src/styles/index.scss';
import 'babel-polyfill';

export const init = ({id, apiKey, endpoint, search='', lng='no', auth0Config}) => {
  new ShareActor({ apiKey, endpoint });
  T.setLanguage(lng);
  ReactDOM.render(<App apiKey={apiKey} endpoint={endpoint}/>, document.getElementById(id));
};
