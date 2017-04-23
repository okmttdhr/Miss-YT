// @flow
import React from 'react'
import { Text, View, ScrollView, Image } from 'react-native'
import { chunk } from 'lodash'

import type {TChannelStore} from '../../types/Channel'
import Icon from 'react-native-vector-icons/FontAwesome'
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
      <Image style={styles.thumbnail} source={{uri: `${channel.youtube.thumbnail}`}} />
      <View style={styles.rank}>
        <Text style={styles.rankText}>{channel.rank}</Text>
      </View>
      <View style={styles.panelInfo}>
        <Text style={styles.name}>{channel.youtube.name}</Text>
        <View style={styles.icon}>
          <Icon name='rocket' size={20} color={channel.isLiked ? '#900' : '#ddd'} />
        </View>
      </View>
    </View>
  </View>
)

export const ChannelPanels = ({channels}: TChannelPanels) => (
  <View style={styles.channelPanels}>
    <ScrollView style={styles.scrollView}>
      {channels.length > 0
        ? chunk(channels, 2).map((items: TChannelStore[], index: number) => {
          const chunkedChannels = items.map((item, i) => {
            const isSingle = items.length === 1
            if (isSingle) {
              return null
            }
            const isEven = (i + 1) % 2 === 0
            return (<Panel key={i} channel={item} isMargin={isEven} />)
          })
          return (<View style={styles.panelWrapper} key={index}>{chunkedChannels}</View>)
        }) : null}
    </ScrollView>
  </View>
)
