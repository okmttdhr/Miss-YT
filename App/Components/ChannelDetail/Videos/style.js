// @flow
import { StyleSheet } from 'react-native';
import {metrics, fontSize} from '../../../Themes/';

export default StyleSheet.create({
  errorMessage: {
    marginTop: metrics.doubleBaseMargin,
    fontSize: fontSize.small,
    textAlign: 'center',
  },
});
