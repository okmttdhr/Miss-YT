// @flow
import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import styles from './style';
import type {TChannelStore, TChannelActions, TDefaultChannel} from '../../types/';

type TChannelPanel = {
  channel: TDefaultChannel,
  channelActions: TChannelActions,
  likesPostRequest: (channel: TChannelStore) => void,
}

export const ChannelDetail = ({channel, likesPostRequest}: TChannelPanel) => (
  <View style={styles.container}>
    <View style={styles.infoContainer}>
      <View style={styles.infoTop}>
        <Image style={styles.infoTopImage} source={{uri: `${channel.item.youtube.thumbnail}`}} />
        <Text style={styles.infoTopLike} onPress={() => likesPostRequest(channel.item)} >いいね</Text>
      </View>
      <View style={styles.infoName}>
        <Text>{channel.item.youtube.name}</Text>
      </View>
      <View style={styles.infoDetail}>
        <Text>{channel.item.rank}</Text>
        <Text>{channel.itemMyInfo.rank}</Text>
        <Text>{channel.item.likeCount}</Text>
        <Text>{channel.itemMyInfo.likeCount}</Text>
        <Text>{channel.item.youtube.subscriberCount}</Text>
      </View>
    </View>
  </View>
);

// <Text>{channel.errorMessage}</Text>
