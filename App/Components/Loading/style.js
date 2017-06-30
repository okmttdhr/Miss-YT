// @flow
import { StyleSheet } from 'react-native';
import { assign } from 'lodash';
import { flexRowCenter } from '../../Themes/';

export default StyleSheet.create({
  container: assign({}, flexRowCenter, {
    paddingTop: 10,
    paddingBottom: 10,
  }),
});
