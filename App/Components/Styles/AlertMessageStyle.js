// @flow

import { StyleSheet } from 'react-native';
import { colors, Metrics, Fonts } from '../../Themes/';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginVertical: Metrics.section,
  },
  contentContainer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
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
