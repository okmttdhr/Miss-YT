// @flow

import { StyleSheet } from 'react-native';
import { Fonts, colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 5,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    backgroundColor: colors.fire,
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin,
  },
});
