// @flow

import { StyleSheet } from 'react-native';
import { colors, metrics } from '../../Themes';

export default StyleSheet.create({
  container: {
    paddingTop: 70,
    backgroundColor: colors.background,
  },
  form: {
    backgroundColor: colors.snow,
    margin: metrics.baseMargin,
    borderRadius: 4,
  },
  row: {
    paddingVertical: metrics.doubleBaseMargin,
    paddingHorizontal: metrics.doubleBaseMargin,
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
    paddingBottom: metrics.doubleBaseMargin,
    paddingHorizontal: metrics.doubleBaseMargin,
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
