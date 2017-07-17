// @flow
import { StyleSheet } from 'react-native';

import {viewportWidth} from '../../../Services/';
import {fontSize, metrics, colors} from '../../../Themes/';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  textInput: {
    height: 36,
    width: viewportWidth(80),
    fontSize: fontSize.medium,
  },
  errorMessage: {
    marginTop: metrics.doubleBaseMargin,
    fontSize: fontSize.small,
    color: colors.error,
  },
  switchForgotPassword: {
    fontSize: fontSize.small,
    marginBottom: metrics.doubleBaseMargin,
  },
});
