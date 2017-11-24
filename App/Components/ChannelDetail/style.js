// @flow
import { StyleSheet } from 'react-native';
import { viewportWidth, viewportHeight } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: viewportWidth(100),
    height: viewportHeight(100),
  },

  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 30,
    width: viewportWidth(100),
  },

  infoTop: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  infoTopImage: {
    width: viewportWidth(30),
    height: viewportWidth(30),
    borderRadius: viewportWidth(30) / 2,
  },
  infoTopLikeWrapper: {
    height: viewportWidth(30),
    marginLeft: 'auto',
    // marginTop: 30,
    marginRight: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoTopLike: {
  },

  infoName: {
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
  infoDetailItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
  },
  infoDetailItemIcon: {
    marginRight: 2,
  },
});
