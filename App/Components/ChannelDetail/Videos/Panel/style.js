// @flow
import { StyleSheet } from 'react-native';
import { viewportWidth, fontSize } from '../../../../Themes/';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  image: {
    width: viewportWidth(50),
    height: viewportWidth(28),
    marginRight: 5,
  },
  title: {
    flexWrap: 'wrap',
    fontSize: fontSize.regular,
    width: viewportWidth(50) - 20,
    paddingTop: 2,
  },
});
