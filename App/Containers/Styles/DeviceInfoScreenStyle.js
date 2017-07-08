// @flow

import { StyleSheet } from 'react-native';
import { colors, metrics, Fonts, applicationStyles } from '../../Themes/';

export default StyleSheet.create({
  ...applicationStyles.screen,
  cardTitle: {
    alignSelf: 'center',
    fontSize: Fonts.size.regular,
    fontWeight: 'bold',
    marginVertical: metrics.baseMargin,
    color: colors.snow,
  },
  cardContainer: {
    backgroundColor: colors.ember,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 2,
    shadowColor: colors.panther,
    shadowOffset: {
      height: 7,
      width: 7,
    },
    shadowRadius: 2,
    paddingBottom: metrics.baseMargin,
    margin: metrics.baseMargin,
  },
  rowContainer: {
    flexDirection: 'row',
    borderColor: colors.windowTint,
    borderWidth: 0.5,
    borderRadius: 2,
    marginHorizontal: metrics.baseMargin,
  },
  rowLabelContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.snow,
  },
  rowLabel: {
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: metrics.baseMargin,
    marginLeft: metrics.baseMargin,
  },
  rowInfoContainer: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: colors.silver,
  },
  rowInfo: {
    fontSize: Fonts.size.regular,
    margin: metrics.baseMargin,
  },
});
