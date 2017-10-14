// @flow
import React from 'react';
import { Text, View, Image } from 'react-native';

import styles from './style';
import type {TChannelStore} from '../../../types/Channel';
import {LikedIcon} from './LikedIcon';

type TChannelPanel = {
  channel: TChannelStore,
  isMargin: boolean,
  likesPostRequest: (channel: TChannelStore) => void,
}

export const Panel = ({channel, isMargin, likesPostRequest}: TChannelPanel) => (
  <View style={styles.panel}>
    <View style={isMargin ? styles.panelContentEven : styles.panelContentOdd}>
      <Image style={styles.thumbnail} source={{uri: `${channel.youtube.thumbnail}`}} />
      <View style={styles.rank}>
        <Text style={styles.rankText}>{channel.rank}</Text>
      </View>
      <View style={styles.panelInfo}>
        <Text style={styles.name}>{channel.youtube.name}</Text>
        <View
          style={styles.icon}
        >
          <LikedIcon
            channel={channel}
            likesPostRequest={likesPostRequest}
          />
        </View>
        <Text style={styles.likeCount}>{channel.likeCount}</Text>
      </View>
    </View>
  </View>
);
