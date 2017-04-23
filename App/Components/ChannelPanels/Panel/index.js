// @flow
import React from 'react'
import { Text, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import type {TChannelStore} from '../../../types/Channel'
import styles from './style'

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
