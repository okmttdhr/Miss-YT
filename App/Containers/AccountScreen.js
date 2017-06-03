// @flow

import React from 'react';
import { Text, View } from 'react-native';

import styles from './Styles/PresentationScreenStyle';
import {addChannels, updateChannels} from '../Services/';
import {AccountForm} from '../Components/';

type IAccountScreen = {
  title: string,
}

export const AccountScreen = (props: IAccountScreen) => (
  <View style={[styles.container]}>
    <Text>{props.title} Screen!</Text>
    <Text onPress={addChannels}>Channelを追加</Text>
    <Text onPress={updateChannels}>Channelを更新</Text>
    <AccountForm />
  </View>
);
