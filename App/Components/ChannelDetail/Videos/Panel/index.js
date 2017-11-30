// @flow
import React from 'react';
import { View, Text, Image, Linking, TouchableOpacity } from 'react-native';

import styles from './style';
import type {TVideo} from '../../../../types/';

type TPanel = {
  video: TVideo;
}

export const Panel = ({video}: TPanel) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={() => {
      const url = `https://www.youtube.com/watch?v=${video.videoId}`;
      Linking.canOpenURL(url).then((supported) => {
        if (!supported) {
          return;
        }
        Linking.openURL(url);
      }).catch();
    }}
  >
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{uri: video.thumbnail}}
      />
      <Text style={styles.title} numberOfLines={4}>{video.title}</Text>
    </View>
  </TouchableOpacity>
);
