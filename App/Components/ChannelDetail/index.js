// @flow
import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import styles from './style';
import type {TChannelStore, TChannelActions, TDefaultChannel} from '../../types/';
import {ButtonDefault} from '../ButtonDefault';

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
        <ButtonDefault
          styles={styles.infoTopLike}
          text={'いいね'}
          onPress={() => likesPostRequest(channel.item)}
          disabled={channel.isFetchingMyInfo}
        />
      </View>
      <View style={styles.infoName}>
        <Text style={styles.infoNameText}>{channel.item.youtube.name}</Text>
      </View>
      <View style={styles.infoDetail}>
        <View>
          <Text>ランキング {channel.item.rank}位</Text>
        </View>
        <View>
          <Text>マイランキング {channel.itemMyInfo.rank}位</Text>
        </View>
        <View>
          <Text>いいね数 {channel.item.likeCount}</Text>
        </View>
        <View>
          <Text>マイいいね数 {channel.itemMyInfo.likeCount}</Text>
        </View>
        <View>
          <Text>チャンネル登録者数 {channel.item.youtube.subscriberCount}人</Text>
        </View>
      </View>
    </View>
  </View>
);

// <Text>{channel.errorMessage}</Text>
