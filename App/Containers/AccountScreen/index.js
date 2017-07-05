// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, View } from 'react-native';

import styles from './style';
import type {TUserActions, TDefaultUser} from '../../types/';
import {addChannels, updateChannels} from '../../Services/';
import {AccountForm, AccountInfo} from '../../Components/';
import {userActions} from '../../Redux/';

type IAccountScreen = {
  title: string;
  user: TDefaultUser;
  userActions: TUserActions;
}

export const AccountScreen = (props: IAccountScreen) => {
  const {title, user} = props;
  const actions = props.userActions;
  return (
    <View style={styles.container}>
      <Text>{title} Screen!</Text>
      <Text onPress={addChannels}>Channelを追加</Text>
      <Text onPress={updateChannels}>Channelを更新</Text>
      {user.item.uid !== '' ?
        <AccountInfo user={user} updateProfile={actions.userUpdateProfile} /> :
        <AccountForm user={user} login={actions.userLogin} createUser={actions.userCreate} />}
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
});

export const ConnectedAccountScreen = connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
