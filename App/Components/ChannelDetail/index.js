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
    <Text>{channel.item.rank}</Text>
    <Text>{String(channel.item.isLiked)}</Text>
    <Text>{channel.item.likeCount}</Text>
    <Text>{channel.item.youtube.thumbnail}</Text>
    <Text>{channel.item.youtube.subscriberCount}</Text>
    <Text>{String(channel.isFetching)}</Text>
    <Text>{channel.errorMessage}</Text>
  </View>
);
