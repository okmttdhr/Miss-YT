// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';

import type {TDefaultLikedChannels, TLikedChannelsActions} from '../../types/Redux/';

import styles from './style';
import {likedChannelsActions} from '../../Redux/';
import {ChannelPanels} from '../../Components';

type IMyRankingScreen = {
  likedChannels: TDefaultLikedChannels,
  likedChannelsActions: TLikedChannelsActions
}

export class MyRankingScreen extends React.Component {
  componentDidMount() {
    if (this.props.likedChannels.startAt === 1) {
      this.props.likedChannelsActions.likedChannelsRequest();
    }
  }
  props: IMyRankingScreen
  render() {
    return (
      <View style={[styles.container]}>
        <ChannelPanels
          channels={this.props.likedChannels}
          setContentHeight={this.props.likedChannelsActions.likedChannelsSetContentHeight}
          channelsRequest={this.props.likedChannelsActions.likedChannelsRequest}
          likesPostRequest={this.props.likedChannelsActions.likedChannelsLikesPostRequest}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  likedChannels: state.likedChannels,
});

const mapDispatchToProps = dispatch => ({
  likedChannelsActions: bindActionCreators(likedChannelsActions, dispatch),
});

export const ConnectedMyRankingScreen =
  connect(mapStateToProps, mapDispatchToProps)(MyRankingScreen);
