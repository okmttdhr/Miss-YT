// @flow
import { StyleSheet } from 'react-native';
import { viewportWidth, flexRowCenter, metrics, fontSize, HEADER_HEIGHT, FOOTER_HEIGHT } from '../../Themes/';

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
  errorMessage: {
    marginTop: metrics.doubleBaseMargin,
    fontSize: fontSize.small,
    textAlign: 'center',
  },
});
