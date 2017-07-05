// @flow
import { StyleSheet } from 'react-native';
import { assign } from 'lodash';

export default StyleSheet.create({
  container: assign({}, {
    flexDirection: 'row',
    justifyContent: 'center',
  }, {
    paddingTop: 10,
    paddingBottom: 10,
  }),
});
