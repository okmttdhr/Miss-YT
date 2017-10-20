// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
// import Secrets from 'react-native-config';

import styles from './style';
import type {TUserActions, TDefaultUser} from '../../types/';
// import {addChannels, updateChannels, updateLikes} from '../../Services/';
// import {ChannelDetailInfo, ChannelDetailForm} from '../../Components/';
import {userActions} from '../../Redux/';

type IChannelDetailScreen = {
  user: TDefaultUser;
  userActions: TUserActions;
}

export const ChannelDetailScreen = (props: IChannelDetailScreen) => {
  console.log(props);
  return (
    <View style={styles.container}>
      ChannelDetailScreen
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
});

export const ConnectedChannelDetailScreen =
  connect(mapStateToProps, mapDispatchToProps)(ChannelDetailScreen);
