// @flow
import React, {Component} from 'react';
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

export class AccountForm extends Component {
  props: TAccountForm

  render() {
    const {user, userActions} = this.props;
    return (
      <View style={styles.container}>
        {user.isForgotPassword ?
          <PasswordResetForm
            user={user}
            switchForgotPassword={userActions.userSwitchForgotPassword}
          /> :
          <AuthenticateForm
            user={user}
            userActions={userActions}
          />
        }
      </View>
    );
  }
}
