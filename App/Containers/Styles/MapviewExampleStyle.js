// @flow

import { StyleSheet } from 'react-native';
import { applicationStyles } from '../../Themes/';

export default StyleSheet.create({
  ...applicationStyles.screen,
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    // For Android :/
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
