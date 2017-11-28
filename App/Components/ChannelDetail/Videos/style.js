// @flow
import { StyleSheet } from 'react-native';
import { viewportWidth, metrics, fontSize } from '../../../Themes/';

export default StyleSheet.create({
  scrollView: {
    paddingHorizontal: 5,
    width: viewportWidth(100),
  },
  errorMessage: {
    marginTop: metrics.doubleBaseMargin,
    fontSize: fontSize.small,
    textAlign: 'center',
  },
});
