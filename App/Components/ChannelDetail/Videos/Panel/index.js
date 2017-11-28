// @flow
import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './style';
import type {TVideo} from '../../../../types/';

type TPanel = {
  video: TVideo;
}

export const Panel = ({video}: TPanel) => (
  <View style={styles.container}>
    <Image style={styles.image} source={{uri: video.thumbnail}} />
    <Text style={styles.title} numberOfLines={4}>{video.title}</Text>
  </View>
);
