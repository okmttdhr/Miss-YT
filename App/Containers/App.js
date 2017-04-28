// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import '../I18n/I18n';

import RootContainer from './RootContainer';
import { createStore } from '../Redux';
import applyConfigSettings from '../Config';

applyConfigSettings();
const store = createStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}

export default App;
