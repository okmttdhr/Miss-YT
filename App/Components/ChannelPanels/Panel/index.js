// @flow
import React from 'react';
import { Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import type {TChannelStore} from '../../../types/Channel';
import {COLOR_RED} from '../../../constants';
import styles from './style';

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
          <Icon
            name={channel.isLiked ? 'favorite' : 'favorite'}
            size={20}
            color={COLOR_RED}
            onPress={() => {
              likesPostRequest(channel);
            }}
          />
        </View>
        <Text style={styles.likeCount}>{channel.likeCount}</Text>
      </View>
    </View>
  </View>
);
