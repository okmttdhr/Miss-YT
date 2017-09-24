// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';

import type {TDefaultChannels, TChannelsActions} from '../types/Redux/channels';

import styles from './Styles/RankingScreenStyle';
import {channelsActions} from '../Redux/';
import {ChannelPanels} from '../Components';

type IRankingScreen = {
  channels: TDefaultChannels,
  channelsActions: TChannelsActions
}

export class RankingScreen extends React.Component {
  componentDidMount() {
    if (this.props.channels.startAt === 1) {
      this.props.channelsActions.channelsRequest();
    }
  }
  props: IRankingScreen
  render() {
    return (
      <View style={[styles.container]}>
        <ChannelPanels
          channels={this.props.channels}
          setContentHeight={this.props.channelsActions.setContentHeight}
          channelsRequest={this.props.channelsActions.channelsRequest}
          likesPostRequest={this.props.channelsActions.channelsLikesPostRequest}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  channels: state.channels,
});

const mapDispatchToProps = dispatch => ({
  channelsActions: bindActionCreators(channelsActions, dispatch),
});

export const ConnectedRankingScreen = connect(mapStateToProps, mapDispatchToProps)(RankingScreen);
