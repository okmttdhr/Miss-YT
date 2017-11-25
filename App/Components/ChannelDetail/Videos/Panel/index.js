// @flow
import React from 'react';
import { View, Text } from 'react-native';

import styles from './style';
import type {TVideo} from '../../../../types/';

type TPanel = {
  video: TVideo;
}

export const Panel = ({video}: TPanel) => (
  <View style={styles.panel}>
    <Text>{video.thumbnail}</Text>
    <Text>{video.videoId}</Text>
    <Text>{video.title}</Text>
  </View>
);
