// @flow

import { StyleSheet } from 'react-native';
import { colors, Fonts, Metrics, ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
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
    ...ApplicationStyles.darkLabelContainer,
  },
  componentLabel: {
    ...ApplicationStyles.darkLabel,
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
    ...ApplicationStyles.groupContainer,
  },
});
