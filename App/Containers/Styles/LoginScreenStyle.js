// @flow

import { StyleSheet } from 'react-native';
import { colors, Metrics } from '../../Themes';

export default StyleSheet.create({
  container: {
    paddingTop: 70,
    backgroundColor: colors.background,
  },
  form: {
    backgroundColor: colors.snow,
    margin: Metrics.baseMargin,
    borderRadius: 4,
  },
  row: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  rowLabel: {
    color: colors.charcoal,
  },
  textInput: {
    height: 40,
    color: colors.coal,
  },
  textInputReadonly: {
    height: 40,
    color: colors.steel,
  },
  loginRow: {
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row',
  },
  loginButtonWrapper: {
    flex: 1,
  },
  loginButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.charcoal,
    backgroundColor: colors.panther,
    padding: 6,
  },
  loginText: {
    textAlign: 'center',
    color: colors.silver,
  },
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
