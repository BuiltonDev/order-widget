import React from 'react';
import Reflux from 'reflux';
import {DebounceInput} from 'react-debounce-input';
import Header from 'src/components/Header';
import Actions from 'src/reflux/Actions';
import T from 'src/utils/i18n';

class Receipt extends Reflux.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="receipt">
        <Header showBackNav={true}>
          <span className="header-title">{T.translate('receipt.header')}</span>
        </Header>
        <div className="kvass-widget__content-body">
          <div className="content">
          </div>
          <div className="kvass-widget__content-footer">
            <div className="footer-content">
              <button className="kvass-widget__primary-button" onClick={() => window.KvassOrdering.close()}>{T.translate('global.last')}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Receipt;
