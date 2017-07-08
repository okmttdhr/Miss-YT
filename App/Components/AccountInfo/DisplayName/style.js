// @flow
import { StyleSheet } from 'react-native';
import {fontSize, metrics} from '../../../Themes/';

export default StyleSheet.create({
  container: {
    marginTop: metrics.doubleBaseMargin,
    marginBottom: metrics.doubleBaseMargin,
    alignItems: 'flex-start',
  },
  textInput: {
    height: 36,
    fontSize: fontSize.medium,
  },
});
