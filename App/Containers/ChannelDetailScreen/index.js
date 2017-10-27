// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, View } from 'react-native';
// import Secrets from 'react-native-config';

import styles from './style';
import type {TChannelActions, TDefaultChannel, TChannelsActions} from '../../types/';
import {ChannelDetail} from '../../Components/';
import {channelActions, channelsActions} from '../../Redux/';

type IChannelDetailScreen = {
  channel: TDefaultChannel,
  channelActions: TChannelActions,
  channelsActions: TChannelsActions,
}

export const ChannelDetailScreen = (props: IChannelDetailScreen) => {
  console.log(props);
  const {channel} = props;
  return (
    <View style={styles.container}>
      <Text>
        <ChannelDetail
          channel={channel}
          channelActions={props.channelActions}
          likesPostRequest={props.channelsActions.channelsLikesPostRequest}
        />
      </Text>
    </View>
  );
};

const mapStateToProps = state => ({
  channel: state.channel,
});

const mapDispatchToProps = dispatch => ({
  channelActions: bindActionCreators(channelActions, dispatch),
  channelsActions: bindActionCreators(channelsActions, dispatch),
});

export const ConnectedChannelDetailScreen =
  connect(mapStateToProps, mapDispatchToProps)(ChannelDetailScreen);
