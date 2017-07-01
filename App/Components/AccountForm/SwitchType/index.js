// @flow
import React from 'react';
import {Text} from 'react-native';

import styles from './style';
import type {AccountType} from '../index';

export const SwitchType = ({onPress, type}: {type: AccountType, onPress: () => void}) => (
  <Text style={styles.container} onPress={onPress}>
    {type === 'createUser' ?
      '既にアカウントをお持ちの方はこちらをタップ' : 'まだアカウントをお持ちでない方はこちらをタップ'}
  </Text>
);
