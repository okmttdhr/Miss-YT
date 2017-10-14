// @flow
import React, {Component} from 'react';
import { Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import type {TChannelStore} from '../../../../types/Channel';
import {COLOR_RED} from '../../../../constants';

type TLikedIcon = {
  channel: TChannelStore,
  likesPostRequest: (channel: TChannelStore) => void,
}

export class LikedIcon extends Component<TLikedIcon, void> {
  props: TLikedIcon
  render() {
    const {channel, likesPostRequest} = this.props;
    return (
      <Icon
        name={channel.isLiked ? 'favorite' : 'favorite-border'}
        size={20}
        color={COLOR_RED}
        onPress={() => {
          likesPostRequest(channel);
        }}
      />
    );
  }
}
