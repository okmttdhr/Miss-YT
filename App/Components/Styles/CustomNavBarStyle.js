import { colors, metrics } from '../../Themes/';

export default {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: metrics.navBarHeight,
    paddingHorizontal: metrics.baseMargin,
    backgroundColor: colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftButton: {
    paddingTop: metrics.baseMargin,
  },
  logo: {
    height: metrics.navBarHeight - metrics.doubleBaseMargin,
    width: metrics.navBarHeight - metrics.doubleBaseMargin,
    resizeMode: 'contain',
  },
  rightButton: {
    paddingTop: metrics.baseMargin,
  },
};
