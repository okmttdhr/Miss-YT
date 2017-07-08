import { colors, metrics, Fonts } from '../../Themes/';

export default {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: metrics.navBarHeight,
    paddingTop: metrics.smallMargin,
    paddingHorizontal: 5,
    backgroundColor: colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: colors.snow,
    marginTop: metrics.doubleBaseMargin,
    backgroundColor: colors.transparent,
    fontWeight: 'bold',
    fontSize: Fonts.size.input,
  },
  logo: {
    alignSelf: 'center',
    marginTop: metrics.baseMargin,
    height: metrics.icons.large,
    width: metrics.icons.large,
  },
  rightButtons: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  leftButtons: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
};
