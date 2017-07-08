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
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: metrics.baseMargin,
    backgroundColor: colors.fire,
    borderRadius: metrics.smallMargin,
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: colors.snow,
    textAlign: 'center',
    marginBottom: metrics.smallMargin,
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
