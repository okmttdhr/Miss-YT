// @flow

import { StyleSheet } from 'react-native';
import { Fonts, colors, metrics } from '../../Themes/';

export default StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 5,
    marginHorizontal: metrics.section,
    marginVertical: metrics.baseMargin,
    backgroundColor: colors.fire,
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: metrics.baseMargin,
  },
});
