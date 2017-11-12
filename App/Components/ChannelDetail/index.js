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

export const ChannelDetail = ({channel, likesPostRequest, channelActions}: TChannelPanel) => (
  <View style={styles.container}>
    <View>
      <View>
        <Image source={{uri: `${channel.item.youtube.thumbnail}`}} />
        <Text onPress={() => likesPostRequest(channel.item)} >いいね</Text>
        <Text>{String(channel.item.isLiked)}</Text>
      </View>
      <View>
        <Text>{channel.item.youtube.name}</Text>
      </View>
      <View>
        <Text>{channel.item.rank}</Text>
        <Text>{channel.itemMyInfo.rank}</Text>
        <Text>{channel.item.likeCount}</Text>
        <Text>{channel.itemMyInfo.likeCount}</Text>
        <Text>{channel.item.youtube.subscriberCount}</Text>
      </View>
    </View>
    <Text>{channel.errorMessage}</Text>
  </View>
);
