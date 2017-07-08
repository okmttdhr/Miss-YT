// @flow
import Fonts from './Fonts';
import {metrics} from './metrics';
import {colors} from './colors';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

export const applicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: colors.transparent,
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    container: {
      flex: 1,
      paddingTop: metrics.baseMargin,
    },
    section: {
      margin: metrics.section,
      padding: metrics.baseMargin,
      borderTopColor: colors.frost,
      borderTopWidth: 0.5,
      borderBottomColor: colors.frost,
      borderBottomWidth: 1,
    },
    sectionText: {
      color: colors.snow,
      marginVertical: metrics.smallMargin,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    subtitle: {
      color: colors.snow,
      padding: metrics.smallMargin,
      marginBottom: metrics.smallMargin,
      marginHorizontal: metrics.smallMargin,
    },
  },
  darkLabelContainer: {
    backgroundColor: colors.cloud,
    padding: metrics.smallMargin,
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: colors.snow,
  },
  groupContainer: {
    margin: metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  sectionTitle: {
    ...Fonts.style.h4,
    color: colors.coal,
    backgroundColor: colors.ricePaper,
    padding: metrics.smallMargin,
    marginTop: metrics.smallMargin,
    marginHorizontal: metrics.baseMargin,
    borderWidth: 1,
    borderColor: colors.ember,
    alignItems: 'center',
    textAlign: 'center',
  },
};

export const flexRowCenter = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
};

export const flexColumnCenter = {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
};
