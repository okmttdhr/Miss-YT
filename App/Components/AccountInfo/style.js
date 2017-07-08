// @flow
import { StyleSheet } from 'react-native';
import {viewportWidth} from '../../Services/';
import {flexColumnCenter, fontSize} from '../../Themes/';

export default StyleSheet.create({
  container: {
    ...flexColumnCenter,
    width: viewportWidth(80),
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
