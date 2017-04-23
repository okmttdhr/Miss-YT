// @flow
import { StyleSheet, Dimensions } from 'react-native'
import { assign } from 'lodash'

const viewportWidth = (percentageWidth) => {
  return Dimensions.get('window').width * (percentageWidth / 100)
}

const HEADER_HEIGHT = 66
const PANEL_MARGIN = 2
const THUMBNAIL_WIDTH = viewportWidth(50) - PANEL_MARGIN
const PANEL_WIDTH = THUMBNAIL_WIDTH + 30

const flexRowCenter = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center'
}

const panelContent = {
  flex: 1,
  height: PANEL_WIDTH,
  marginRight: PANEL_MARGIN,
  marginBottom: PANEL_MARGIN
  // backgroundColor: 'powderblue'
}

export default StyleSheet.create({
  channelPanels: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: HEADER_HEIGHT
  },
  scrollView: {
    width: viewportWidth(100)
  },

  panelWrapper: flexRowCenter,
  panel: flexRowCenter,
  panelContentOdd: panelContent,
  panelContentEven: assign({}, panelContent, {
    marginRight: 0
  }),

  thumbnail: {
    width: THUMBNAIL_WIDTH,
    height: THUMBNAIL_WIDTH
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
    backgroundColor: '#ffffff'
  },
  rankText: {
    backgroundColor: 'transparent'
  },

  panelInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
    // justifyContent: 'flex-start'
  },
  name: {
    flex: 1,
    marginTop: 5,
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold'
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
    justifyContent: 'flex-end'
  }
})
