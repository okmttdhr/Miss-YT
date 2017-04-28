// @flow
import { StyleSheet } from 'react-native';
import { assign } from 'lodash';

import { viewportWidth, flexRowCenter } from '../../../Services/';

const PANEL_MARGIN = 2;
const THUMBNAIL_WIDTH = viewportWidth(50) - PANEL_MARGIN;
const PANEL_WIDTH = THUMBNAIL_WIDTH + 30;

const panelContent = {
  flex: 1,
  height: PANEL_WIDTH,
  marginRight: PANEL_MARGIN,
  marginBottom: PANEL_MARGIN,
  // backgroundColor: 'powderblue'
};

export default StyleSheet.create({
  panel: flexRowCenter,
  panelContentOdd: panelContent,
  panelContentEven: assign({}, panelContent, {
    marginRight: 0,
  }),

  thumbnail: {
    width: THUMBNAIL_WIDTH,
    height: THUMBNAIL_WIDTH,
  },
  rank: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    position: 'absolute',
    left: 5,
    top: 5,
    borderRadius: 100,
    backgroundColor: '#ffffff',
  },
  rankText: {
    backgroundColor: 'transparent',
  },

  panelInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    marginTop: 5,
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
    justifyContent: 'flex-end',
  },
});
