// @flow

import React from 'react'
import { Text, View } from 'react-native'
import styles from './Styles/PresentationScreenStyle'

type IPresentationScreen = {
  title: string,
}

export const PresentationScreen = (props: IPresentationScreen) => (
  <View style={[styles.container]}>
    <Text>Tab {props.title}</Text>
  </View>
)
