// @flow

import { StyleSheet } from 'react-native';
import { ApplicationStyles, Metrics, colors } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: colors.background,
  },
  row: {
    flex: 1,
    backgroundColor: colors.fire,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center',
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: colors.snow,
    textAlign: 'center',
    marginVertical: Metrics.smallMargin,
  },
  label: {
    textAlign: 'center',
    color: colors.snow,
    marginBottom: Metrics.smallMargin,
  },
  listContent: {
    marginTop: Metrics.baseMargin,
  },
});
