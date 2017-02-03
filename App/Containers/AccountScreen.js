// @flow

import React from 'react'
import { Text, View } from 'react-native'
import styles from './Styles/PresentationScreenStyle'
import Secrets from 'react-native-config'

type IAccountScreen = {
  title: string,
}

export const AccountScreen = (props: IAccountScreen) => (
  <View style={[styles.container]}>
    <Text>{props.title} Screen!</Text>
    <Text>{Secrets.ENV_TEST}</Text>
  </View>
)
