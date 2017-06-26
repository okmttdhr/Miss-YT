// @flow

import Fonts from './Fonts';
import Metrics from './Metrics';
import colors from './colors';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
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
      paddingTop: Metrics.baseMargin,
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin,
      borderTopColor: colors.frost,
      borderTopWidth: 0.5,
      borderBottomColor: colors.frost,
      borderBottomWidth: 1,
    },
    sectionText: {
      color: colors.snow,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    subtitle: {
      color: colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin,
    },
  },
  darkLabelContainer: {
    backgroundColor: colors.cloud,
    padding: Metrics.smallMargin,
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: colors.snow,
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  sectionTitle: {
    ...Fonts.style.h4,
    color: colors.coal,
    backgroundColor: colors.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: colors.ember,
    alignItems: 'center',
    textAlign: 'center',
  },
};

export default ApplicationStyles;
