// @flow

import { StyleSheet } from 'react-native';
import { Metrics, colors } from '../../Themes/';

const navButton = {
  backgroundColor: colors.transparent,
  justifyContent: 'center',
};

export default StyleSheet.create({
  backButton: {
    ...navButton,
    marginTop: Metrics.baseMargin,
    marginLeft: Metrics.baseMargin,
  },
  searchButton: {
    ...navButton,
    marginTop: Metrics.section,
    marginRight: Metrics.baseMargin,
    alignItems: 'center',
  },
});
