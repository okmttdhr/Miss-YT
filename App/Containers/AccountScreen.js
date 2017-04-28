// @flow

import React from 'react';
import { Text, View } from 'react-native';
import styles from './Styles/PresentationScreenStyle';
import {FullButton} from '../Components/';
import {addChannels, updateChannels} from '../Services/';

type IAccountScreen = {
  title: string,
}

export const AccountScreen = (props: IAccountScreen) => (
  <View style={[styles.container]}>
    <Text>{props.title} Screen!</Text>
    <FullButton text={'Channelを追加'} onPress={addChannels} />
    <FullButton text={'Channelを更新'} onPress={updateChannels} />
  </View>
);
