// @flow

import React from 'react'
import { Text, View } from 'react-native'
import styles from './Styles/PresentationScreenStyle'
import {FullButton} from '../Components/'
import {addChannels} from '../Services/'

type IAccountScreen = {
  title: string,
}

export const AccountScreen = (props: IAccountScreen) => (
  <View style={[styles.container]}>
    <Text>{props.title} Screen!</Text>
    <FullButton text={'Channelを追加'} onPress={addChannels} />
  </View>
)
