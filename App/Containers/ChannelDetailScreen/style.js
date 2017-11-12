// @flow
import { StyleSheet } from 'react-native';
import { HEADER_HEIGHT } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: HEADER_HEIGHT,
  },
});
