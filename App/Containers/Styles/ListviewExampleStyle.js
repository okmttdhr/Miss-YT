// @flow

import { StyleSheet } from 'react-native';
import { applicationStyles, metrics, colors } from '../../Themes/';

export default StyleSheet.create({
  ...applicationStyles.screen,
  container: {
    flex: 1,
    marginTop: metrics.navBarHeight,
    backgroundColor: colors.background,
  },
  row: {
    flex: 1,
    backgroundColor: colors.fire,
    marginVertical: metrics.smallMargin,
    justifyContent: 'center',
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: colors.snow,
    textAlign: 'center',
    marginVertical: metrics.smallMargin,
  },
  label: {
    textAlign: 'center',
    color: colors.snow,
    marginBottom: metrics.smallMargin,
  },
  listContent: {
    marginTop: metrics.baseMargin,
  },
});
