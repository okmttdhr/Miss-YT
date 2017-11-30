// @flow
import React from 'react';
import { View, Text } from 'react-native';

import styles from './style';
import type {TDefaultChannel} from '../../../types/';
import {Panel} from './Panel';
import {Loading} from '../../Loading/';

type TVideos = {
  channel: TDefaultChannel;
}

export const Videos = (
  {channel}: TVideos,
) => {
  const {
    videos,
    isFetchingVideos,
    errorMessageVideos,
  } = channel;
  return (
    <View style={styles.container}>
      {videos.map((item) => {
        return (<Panel video={item} key={item.title + item.videoId} />);
      })}
      {errorMessageVideos ?
        <Text style={styles.errorMessage}>{errorMessageVideos}</Text> : null}
      {!isFetchingVideos && !errorMessageVideos && videos.length === 0 ?
        <Text style={styles.errorMessage}>データがありません</Text> : null}
      <Loading isShow={isFetchingVideos} />
    </View>
  );
};
