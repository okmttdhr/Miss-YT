// @flow
import { StyleSheet, Dimensions } from 'react-native'
import { assign } from 'lodash'

const HEADER_HEIGHT = 66

const viewportWidth = (percentageWidth) => {
  return Dimensions.get('window').width * (percentageWidth / 100)
}

const flexRowCenter = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center'
}

const panelContent = {
  flex: 1,
  height: 250,
  marginRight: 2,
  marginBottom: 2,
  backgroundColor: 'powderblue'
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
  })
})
