// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, View } from 'react-native';
import Secrets from 'react-native-config';

import styles from './style';
import type {TUserActions, TDefaultUser} from '../../types/';
import {addChannels, updateChannels, updateLikes} from '../../Services/';
import {AccountInfo, AccountForm} from '../../Components/';
import {userActions} from '../../Redux/';

type IAccountScreen = {
  user: TDefaultUser;
  userActions: TUserActions;
}

export const AccountScreen = (props: IAccountScreen) => {
  const {user} = props;
  const actions = props.userActions;
  return (
    <View style={styles.container}>
      {user.item.email === Secrets.ADMIN_EMAIL ?
        <View style={styles.admin}>
          <Text onPress={addChannels}>Channelを追加</Text>
          <Text onPress={updateChannels}>Channelを更新</Text>
          <Text onPress={updateLikes}>Likeを更新</Text>
        </View> : null}
      {user.item.uid ?
        <AccountInfo user={user} userActions={actions} /> :
        <AccountForm user={user} userActions={actions} />}
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
