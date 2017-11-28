// @flow
import { StyleSheet } from 'react-native';
import { viewportWidth, metrics, fontSize } from '../../../../Themes/';

// const PADDING = 10;

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  image: {
    // width: 30,
    // height: 30,
    // flex: 1,
    width: viewportWidth(50),
    height: viewportWidth(28),
    marginRight: 5,
  },
  title: {
    // flex: 1,
    // width: 0,
    flexWrap: 'wrap',
    fontSize: fontSize.regular,
    width: viewportWidth(50) - 20,
    paddingTop: 2,
  },
});
