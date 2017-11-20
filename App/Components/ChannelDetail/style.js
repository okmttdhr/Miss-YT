// @flow
import { StyleSheet } from 'react-native';
import { viewportWidth, viewportHeight, fontSize } from '../../Themes/';

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
    // padding: viewportWidth(8),
    padding: 30,
    width: viewportWidth(100),
  },
  infoTop: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  infoTopImage: {
    width: viewportWidth(30),
    height: viewportWidth(30),
    borderRadius: viewportWidth(30) / 2,
  },
  infoTopLike: {
    marginLeft: 'auto',
    marginTop: 30,
    marginRight: 30,
  },
  infoName: {
    // flex: 1,
    flexDirection: 'row',
    marginTop: 15,
  },
  infoNameText: {
    fontSize: 20,
  },
  infoDetail: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
});
