// @flow
import { StyleSheet } from 'react-native';

import {viewportHeight, flexColumnCenter} from '../../Themes/';

export default StyleSheet.create({
  container: {
    ...flexColumnCenter,
    alignItems: 'center',
    height: viewportHeight(80),
  },
});
