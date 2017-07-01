// @flow

import { StyleSheet } from 'react-native';
import { applicationStyles, Metrics, colors } from '../../Themes/';

export default StyleSheet.create({
  ...applicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: colors.background,
  },
  row: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: Metrics.baseMargin,
    backgroundColor: colors.fire,
    borderRadius: Metrics.smallMargin,
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin,
  },
  label: {
    alignSelf: 'center',
    color: colors.snow,
    textAlign: 'center',
  },
  listContent: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
