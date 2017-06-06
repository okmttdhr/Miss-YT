// @flow
import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

type TAccountForm = {
  login: () => any;
  createUser: () => any;
}

export const AccountForm = ({login, createUser}: TAccountForm) => {
  return (
    <View style={styles.container}>
      <Text onPress={createUser}>サインイン</Text>
      <Text onPress={login}>ログイン</Text>
    </View>
  );
};
