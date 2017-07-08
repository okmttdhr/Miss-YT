// @flow

import { StyleSheet } from 'react-native';
import { Fonts, colors } from '../Themes/';

export default StyleSheet.create({
  button: {
    backgroundColor: colors.main,
    borderRadius: 2,
    shadowRadius: 1,
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.7,
    shadowColor: 'black',
  },
  buttonText: {
    margin: 10,
    textAlign: 'center',
    color: colors.snow,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold,
  },
  disabled: {
    opacity: 0.5,
  },
});
