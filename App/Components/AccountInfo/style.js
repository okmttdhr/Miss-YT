// @flow
import { StyleSheet } from 'react-native';
import {viewportWidth} from '../../Services/';
import {flexColumnCenter} from '../../Themes/';

export default StyleSheet.create({
  container: {
    ...flexColumnCenter,
    width: viewportWidth(80),
  },
  containerInfo: {
  },
});
