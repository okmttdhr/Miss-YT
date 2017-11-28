// @flow
import React from 'react';
import { View, ScrollView, Dimensions, Text } from 'react-native';

import styles from './style';
import type {TDefaultChannel} from '../../../types/';
import {Panel} from './Panel';
import {Loading} from '../../Loading/';

const onScroll = (event, contentHeight, channelVideosGetRequest) => {
  const windowScroll = Dimensions.get('window').height + event.nativeEvent.contentOffset.y;
  if (windowScroll > contentHeight) {
    channelVideosGetRequest();
  }
};

type TVideos = {
  channel: TDefaultChannel;
  setContentHeight: (height: number) => void;
  channelVideosGetRequest: (youtubeChannelId: string) => void;
}

export const Videos = (
  {channel, setContentHeight, channelVideosGetRequest}: TVideos,
) => {
  const {
    videos,
    contentHeightVideos,
    isFetchingVideos,
    errorMessageVideos,
  } = channel;
  return (
    <View style={styles.container}>
      <ScrollView
        onScroll={e => onScroll(
          e, contentHeightVideos,
          () => channelVideosGetRequest(channel.item.youtube.id),
        )}
        scrollEventThrottle={200}
        onContentSizeChange={(width, height) => setContentHeight(height)}
        style={styles.scrollView}
      >
        {videos.map((item) => {
          return (<Panel video={item} key={item.title + item.videoId} />);
        })}
        {errorMessageVideos ?
          <Text style={styles.errorMessage}>{errorMessageVideos}</Text> : null}
        {!isFetchingVideos && !errorMessageVideos && videos.length === 0 ?
          <Text style={styles.errorMessage}>データがありません</Text> : null}
        <Loading isShow={isFetchingVideos} />
      </ScrollView>
    </View>
  );
};
