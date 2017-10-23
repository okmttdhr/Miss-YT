// @flow
import React, {Component} from 'react';
import { Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import type {TChannelStore} from '../../../../types/channel';
import {COLOR_RED} from '../../../../constants';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const DEFAULT_SCALE = 1;
const MIN_SCALE = 0.7;

type TLikedIcon = {
  channel: TChannelStore,
  likesPostRequest: (channel: TChannelStore) => void,
}

export class LikedIcon extends Component<TLikedIcon, void> {
  constructor() {
    super();
    this.scaleValue = new Animated.Value(1);
  }
  props: TLikedIcon
  scaleValue: Object;
  scale() {
    this.scaleValue.setValue(0);
    Animated.timing(
      this.scaleValue,
      {
        toValue: 1,
        duration: 300,
        easing: Easing.cubic,
      },
    ).start();
  }
  render() {
    const scale = this.scaleValue.interpolate({
      inputRange: [0, 1],
      outputRange: [MIN_SCALE, DEFAULT_SCALE],
    });
    const {channel, likesPostRequest} = this.props;
    return (
      <AnimatedIcon
        style={{transform: [{scale}]}}
        name={channel.isLiked ? 'favorite' : 'favorite-border'}
        size={20}
        color={COLOR_RED}
        onPress={() => {
          this.scale();
          likesPostRequest(channel);
        }}
      />
    );
  }
}
