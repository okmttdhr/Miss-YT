// @flow

import { StyleSheet } from 'react-native';
import { colors, metrics, applicationStyles } from '../../Themes/';

export default StyleSheet.create({
  ...applicationStyles.screen,
  groupContainer: {
    ...applicationStyles.groupContainer,
  },
  sectionHeaderContainer: {
    ...applicationStyles.darkLabelContainer,
  },
  sectionHeader: {
    ...applicationStyles.darkLabel,
  },
  colorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  backgroundContainer: {
    position: 'relative',
    width: 102,
    height: 102,
    borderWidth: 1,
    borderColor: colors.frost,
  },
  backerImage: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    resizeMode: 'stretch',
  },
  colorContainer: {
    height: 130,
    padding: metrics.smallMargin,
    marginBottom: metrics.smallMargin,
  },
  colorSquare: {
    width: 100,
    height: 100,
  },
  colorName: {
    width: 100,
    height: metrics.doubleBaseMargin,
    lineHeight: metrics.doubleBaseMargin,
    color: colors.charcoal,
    textAlign: 'center',
  },
  fontRow: {
    padding: metrics.smallMargin,
    marginHorizontal: metrics.smallMargin,
    color: colors.snow,
  },
});
