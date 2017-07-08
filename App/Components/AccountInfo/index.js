// @flow
import React from 'react';
import {View, Text} from 'react-native';

import styles from './style';
import type {TDefaultUser, TUserActions} from '../../types/';
import {logOut} from '../../Services/';
import {DisplayName} from './DisplayName/';
import {ShouldVerify} from './ShouldVerify/';

type TAccountInfo = {
  user: TDefaultUser;
  userActions: TUserActions;
}

export const AccountInfo = ({user, userActions}: TAccountInfo) => (
  <View style={styles.container}>
    {user.item.emailVerified ?
      <View style={styles.containerInfo}>
        <DisplayName
          updateProfile={userActions.userUpdateProfile}
          user={user}
        />
        <Text style={styles.email}>{user.item.email}</Text>
        <Text style={styles.logout} onPress={logOut}>{'ログアウト'}</Text>
      </View> :
      <ShouldVerify
        user={user}
        sendEmailVerification={userActions.userSendEmailVerification}
        reload={userActions.userReload}
      />
    }
  </View>
);
