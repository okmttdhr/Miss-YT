// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, View } from 'react-native';

import styles from './Styles/PresentationScreenStyle';
import type {TUserActions} from '../types/';
import {addChannels, updateChannels, firebaseApp} from '../Services/';
import {AccountForm} from '../Components/';
import {userActions} from '../Redux/';


type IAccountScreen = {
  title: string,
  userActions: TUserActions,
}

export const AccountScreen = (props: IAccountScreen) => {
  const {title} = props;
  const actions = props.userActions;
  return (
    <View style={[styles.container]}>
      <Text>{title} Screen!</Text>
      <Text onPress={addChannels}>Channelを追加</Text>
      <Text onPress={updateChannels}>Channelを更新</Text>
      <AccountForm login={actions.userLogin} createUser={actions.userCreate} />
    </View>
  );
};
// export const AccountScreen = ({title, userActions}: IAccountScreen) => (
// );

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
});

export const ConnectedAccountScreen = connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
