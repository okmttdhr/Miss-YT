// @flow

import { StyleSheet } from 'react-native';
import { colors } from '../../Themes/';

export const TabBarStyle = StyleSheet.create({
  container: {
    borderTopColor: colors.steel,
    borderTopWidth: 1,
  },
  navigationBarStyle: {
    backgroundColor: colors.white,
    borderBottomColor: colors.steel,
    borderBottomWidth: 1,
  },
});
