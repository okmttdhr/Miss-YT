// @flow

import { StyleSheet } from 'react-native';
import { Fonts, Metrics, colors } from '../../Themes/';

export default StyleSheet.create({
  applicationView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    margin: Metrics.baseMargin,
  },
  myImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});
