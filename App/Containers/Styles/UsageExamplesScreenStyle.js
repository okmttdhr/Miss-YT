// @flow

import { StyleSheet } from 'react-native';
import { colors, Fonts, Metrics, applicationStyles } from '../../Themes/';

export default StyleSheet.create({
  ...applicationStyles.screen,
  loginBox: {
    padding: Metrics.doubleBaseMargin,
  },
  loginButton: {
    borderWidth: 1,
    borderColor: colors.charcoal,
    backgroundColor: colors.panther,
    padding: 6,
  },
  loginText: {
    textAlign: 'center',
    color: colors.silver,
  },
  componentLabelContainer: {
    ...applicationStyles.darkLabelContainer,
  },
  componentLabel: {
    ...applicationStyles.darkLabel,
  },
  temperature: {
    ...Fonts.style.h4,
    color: colors.snow,
  },
  locale: {
    ...Fonts.style.h4,
    color: colors.snow,
  },
  groupContainer: {
    ...applicationStyles.groupContainer,
  },
});
