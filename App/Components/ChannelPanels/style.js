// @flow
import { StyleSheet } from 'react-native';
import { viewportWidth, flexRowCenter } from '../../Services/';

const HEADER_HEIGHT = 66;
const FOOTER_HEIGHT = 52;

export default StyleSheet.create({
  channelPanels: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: HEADER_HEIGHT,
    paddingBottom: FOOTER_HEIGHT,
  },
  scrollView: {
    width: viewportWidth(100),
  },
  panelWrapper: flexRowCenter,
});
