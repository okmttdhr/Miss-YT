// @flow

import './App/Config/ReactotronConfig';
import { AppRegistry } from 'react-native';
import App from './App/Containers/App';

const _XHR = global.originalXMLHttpRequest && __DEV__ ? global.originalXMLHttpRequest : global.XMLHttpRequest;
XMLHttpRequest = _XHR // eslint-disable-line

AppRegistry.registerComponent('YoutuVote', () => App);
