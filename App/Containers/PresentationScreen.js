// @flow

import React from 'react'
import { Text, View } from 'react-native'
import styles from './Styles/PresentationScreenStyle'
import Secrets from 'react-native-config'

type IPresentationScreen = {
  title: string,
}

export const PresentationScreen = (props: IPresentationScreen) => (
  <View style={[styles.container]}>
    <Text>Tab {props.title}</Text>
    <Text>{Secrets.ENV_TEST}</Text>
  </View>
)
