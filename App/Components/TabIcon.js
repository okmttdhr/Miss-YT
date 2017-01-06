// @flow

import React from 'react'
import { Text, View } from 'react-native'

type ITabIcon = {
  selected: string,
  title: string,
}

export const TabIcon = (props: ITabIcon) => (
  <View>
    {/* ↓classの付与でトグルを表現できるようにする */}
    <Text style={[{color: props.selected ? 'red' : 'black'}]}>
      {props.title}
    </Text>
  </View>
)
