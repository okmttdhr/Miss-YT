// @flow
import { StyleSheet } from 'react-native';

import {viewportWidth, viewportHeight} from '../../Services/';
import {flexColumnCenter, fontSize, metrics, colors} from '../../Themes/';

export default StyleSheet.create({
  container: {
    ...flexColumnCenter,
    alignItems: 'center',
    height: viewportHeight(80),
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
});