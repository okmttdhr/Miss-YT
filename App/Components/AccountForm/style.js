// @flow
import { StyleSheet } from 'react-native';

import {viewportHeight} from '../../Services/';
import {flexColumnCenter} from '../../Themes/';

export default StyleSheet.create({
  container: {
    ...flexColumnCenter,
    alignItems: 'center',
    height: viewportHeight(80),
  },
});
