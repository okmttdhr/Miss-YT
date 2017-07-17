// @flow
import React, {Component} from 'react';
import { View, Text, TextInput } from 'react-native';

import styles from './style';
import type {TDefaultUser, TUserActions} from '../../../types/';
import {ButtonDefault} from '../../ButtonDefault';
import {Loading} from '../../Loading/';

type TPasswordResetForm = {
  user: TDefaultUser;
  userActions: TUserActions;
}

export class PasswordResetForm extends Component {
  constructor(props: TPasswordResetForm) {
    super(props);
    this.state = {
      email: '',
    };
  }

  state: {
    email: string;
  }
  props: TPasswordResetForm

  render() {
    const {user, userActions} = this.props;
    const disabled = this.state.email === '' || user.isFetching;
    return (
      <View style={styles.container}>
        <Loading isShow={user.isFetching} />
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="メールアドレス"
            onChangeText={email => this.setState({email})}
          />
        </View>
        {user.errorMessage ?
          <Text style={styles.errorMessage}>{user.errorMessage}</Text> : null}
        <Text
          style={styles.switchForgotPassword}
          onPress={userActions.userSwitchForgotPassword}
        >{'ログインはこちら'}</Text>
        <View>
          <ButtonDefault
            text={'パスワード再設定メールを送信する'}
            onPress={() => userActions.userSendPasswordResetEmail(this.state.email)}
            disabled={disabled}
          />
        </View>
      </View>
    );
  }
}
