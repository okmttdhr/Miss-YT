// @flow
import { StyleSheet } from 'react-native';
import {viewportWidth, fontSize} from '../../Themes/';

export default StyleSheet.create({
  container: {
    width: viewportWidth(80),
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 60,
  },
  containerInfo: {
  },
  accountShouldVerifyText: {
    lineHeight: 20,
  },
  email: {
    fontSize: fontSize.medium,
  },
  logout: {
    marginTop: 35,
    fontSize: fontSize.small,
  },
});
