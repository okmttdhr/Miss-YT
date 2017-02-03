// @flow

import React from 'react'
import { Text, View } from 'react-native'
import styles from './Styles/PresentationScreenStyle'
import {FullButton} from '../Components/'
import {addYoutubers} from '../Services/'

type IAccountScreen = {
  title: string,
}

export const AccountScreen = (props: IAccountScreen) => (
  <View style={[styles.container]}>
    <Text>{props.title} Screen!</Text>
    <FullButton text={'YouTuberを追加'} onPress={addYoutubers} />
  </View>
)
