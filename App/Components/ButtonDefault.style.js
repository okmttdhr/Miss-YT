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
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  buttonText: {
    paddingTop: 5,
    // flexDirection: 'row',
    // alignItems: 'center',
    // margin: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    // paddingBottom: 0,
    textAlign: 'center',
    // textAlignVertical: 'center',
    // includeFontPadding: false,
    color: colors.snow,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold,
  },
  disabled: {
    opacity: 0.5,
  },
});
