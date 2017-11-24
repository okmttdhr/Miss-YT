// @flow
import React from 'react';
import { View } from 'react-native';

import styles from './style';
import type {TDefaultUser, TUserActions} from '../../types/';
import {AuthenticateForm} from './AuthenticateForm';
import {PasswordResetForm} from './PasswordResetForm';

type TAccountForm = {
  user: TDefaultUser;
  userActions: TUserActions;
}

export type AccountType = 'login' | 'createUser';

export const AccountForm = ({user, userActions}: TAccountForm) => {
  return (
    <View style={styles.container}>
      {user.isForgotPassword ?
        <PasswordResetForm
          user={user}
          userActions={userActions}
        /> :
        <AuthenticateForm
          user={user}
          userActions={userActions}
        />
      }
    </View>
  );
};
