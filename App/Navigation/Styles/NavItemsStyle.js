// @flow

import { StyleSheet } from 'react-native';
import { metrics, colors } from '../../Themes/';

const navButton = {
  backgroundColor: colors.transparent,
  justifyContent: 'center',
};

export default StyleSheet.create({
  backButton: {
    ...navButton,
    marginTop: metrics.baseMargin,
    marginLeft: metrics.baseMargin,
  },
  searchButton: {
    ...navButton,
    marginTop: metrics.section,
    marginRight: metrics.baseMargin,
    alignItems: 'center',
  },
});
