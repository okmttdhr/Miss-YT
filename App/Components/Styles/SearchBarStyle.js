import { StyleSheet } from 'react-native';
import { Fonts, colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.smallMargin,
    backgroundColor: colors.transparent,
    flexDirection: 'row',
    width: Metrics.screenWidth - Metrics.baseMargin,
  },
  searchInput: {
    flex: 5,
    height: Metrics.searchBarHeight,
    alignSelf: 'center',
    padding: Metrics.smallMargin,
    textAlign: 'left',
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.instructions,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.snow,
    paddingLeft: 30,
    color: colors.snow,
    flexDirection: 'row',
  },
  searchIcon: {
    left: Metrics.doubleBaseMargin,
    alignSelf: 'center',
    color: colors.snow,
    backgroundColor: colors.transparent,
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Metrics.baseMargin,
  },
  buttonLabel: {
    color: colors.snow,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.regular,
  },
});
