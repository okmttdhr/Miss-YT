// @flow
import React from 'react'
import { View, ScrollView } from 'react-native'
import { chunk } from 'lodash'

import type {TChannelStore} from '../../types/Channel'
import {Panel} from './Panel'
import styles from './style'

type TChannelPanels = {
  channels: TChannelStore[],
}

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
