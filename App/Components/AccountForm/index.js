// @flow
import React from 'react';
import { View, Text } from 'react-native';

import styles from './style';
import {firebaseApp} from '../../Services/';

type TAccountForm = {}

const createUser = () => {
  firebaseApp.auth().createUserWithEmailAndPassword('email', 'password')
    .then(() => {
      console.log('scc');
      // console.log(test);
    })
    .catch((error) => {
      console.log(error);
    });
};

const login = () => {
  firebaseApp.auth().signInWithEmailAndPassword('email', 'password')
    .then(() => {
      console.log('scc');
      // console.log(test);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const AccountForm = () => {
  return (
    <View style={styles.container}>
      <Text onPress={createUser}>サインイン</Text>
      <Text onPress={login}>ログイン</Text>
    </View>
  );
};
