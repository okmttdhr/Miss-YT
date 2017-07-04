// @flow
import React from 'react';
import {View, Text} from 'react-native';

import styles from './style';
import type {TDefaultUser, TUserUpdateProfile} from '../../types/';
import {DisplayName} from './DisplayName/';

type TAccountInfo = {
  user: TDefaultUser;
  updateProfile: TUserUpdateProfile;
}

const AccountShouldVerify = () => (
  <View>
    <Text>{'AccountShouldVerify. Check your email.'}</Text>
  </View>
);

export const AccountInfo = ({user, updateProfile}: TAccountInfo) => (
  <View style={styles.container}>
    {user.item.emailVerified ?
      <View style={styles.containerInfo}>
        <DisplayName
          updateProfile={updateProfile}
          user={user}
        />
        <Text>{user.item.email}</Text>
      </View> :
      <AccountShouldVerify />
    }
  </View>
);
