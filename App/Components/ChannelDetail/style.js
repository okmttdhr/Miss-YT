// @flow
import { StyleSheet } from 'react-native';
import { viewportWidth, viewportHeight } from '../../Services/';

export default StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: viewportWidth(100),
    height: viewportHeight(100),
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 10,
    width: viewportWidth(100),
  },
  infoTop: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  infoTopImage: {
    width: viewportWidth(30),
    height: viewportWidth(30),
    borderRadius: viewportWidth(30) / 2,
  },
  infoTopLike: {
    marginLeft: 'auto',
  },
  infoName: {
    // flex: 1,
    flexDirection: 'row',
  },
  infoDetail: {
    flexDirection: 'row',
  },
});
