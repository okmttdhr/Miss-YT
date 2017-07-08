// @flow

import { StyleSheet } from 'react-native';
import { colors, metrics, Fonts } from '../../Themes/';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginVertical: metrics.section,
  },
  contentContainer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: metrics.baseMargin,
    marginHorizontal: metrics.baseMargin,
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.regular,
    fontWeight: 'bold',
    color: colors.steel,
  },
  icon: {
    color: colors.steel,
  },
});
