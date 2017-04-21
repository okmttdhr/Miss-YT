// @flow
import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import { chunk } from 'lodash'
import type {TChannelStore} from '../../types/Channel'
import styles from './style'

type TChannelPanels = {
  channels: TChannelStore[],
}

type TChannelPanel = {
  channel: TChannelStore,
  isMargin: boolean
}

export const Panel = ({channel, isMargin}: TChannelPanel) => (
  <View style={styles.panel}>
    <View style={isMargin ? styles.panelContentEven : styles.panelContentOdd}>
      <Text>{channel.id}</Text>
      <Text>{channel.rank}</Text>
      <Text>{channel.youtube.thumbnail}</Text>
      <Text>{channel.youtube.name}</Text>
      <Text>{channel.isLiked}</Text>
    </View>
  </View>
)

export const ChannelPanels = ({channels}: TChannelPanels) => (
  <View style={styles.channelPanels}>
    <ScrollView style={styles.scrollView}>
      {channels.length > 0
        ? chunk(channels, 2).map((items: TChannelStore[], index: number) => {
          const chunkedChannels = items.map((item, i) => {
            const isEven = (i + 1) % 2 === 0
            const isSingle = items.length === 1
            const isMargin = isEven || isSingle
            return (<Panel key={i} channel={item} isMargin={isMargin} />)
          })
          return (<View style={styles.panelWrapper} key={index}>{chunkedChannels}</View>)
        }) : null}
    </ScrollView>
  </View>
)
