// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';

import type {TDefaultChannels, TChannelsActions} from '../types/Redux/ChannelsRedux';

import styles from './Styles/RankingScreenStyle';
import {channelsActions} from '../Redux/ChannelsRedux';
import {ChannelPanels} from '../Components';

type IRankingScreen = {
  title: string,
  channels: TDefaultChannels,
  channelsActions: TChannelsActions
}

export class RankingScreen extends React.Component {
  props: IRankingScreen
  componentDidMount() {
    this.props.channelsActions.channelsRequest();
  }
  render() {
    const items = Object.values(this.props.channels.items);
    return (
      <View style={[styles.container]}>
        <ChannelPanels channels={items} />
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
