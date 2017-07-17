// @flow
import React, {Component} from 'react';
import { View, Text, TextInput } from 'react-native';

import styles from './style';
import type {TDefaultUser, TUserActions} from '../../../types/';
import {ButtonDefault} from '../../ButtonDefault';
import {SwitchType} from '../SwitchType';

type TAuthenticateForm = {
  user: TDefaultUser;
  userActions: TUserActions;
}

export type AccountType = 'login' | 'createUser';

export class AuthenticateForm extends Component {
  constructor(props: TAuthenticateForm) {
    super(props);
    this.state = {
      email: '',
      password: '',
      type: 'login',
    };
  }

  state: {
    email: string;
    password: string;
    type : AccountType;
  }
  props: TAuthenticateForm

  switchType() {
    const type = this.state.type === 'login' ? 'createUser' : 'login';
    this.setState({type});
  }

  render() {
    const {type} = this.state;
    const {user, userActions: {userLogin, userCreate, userSwitchForgotPassword}} = this.props;
    const disabled = this.state.email === '' || this.state.password === '' || user.isFetching;
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="メールアドレス"
            onChangeText={email => this.setState({email})}
          />
          <TextInput
            style={styles.textInput}
            placeholder="パスワード"
            secureTextEntry
            onChangeText={password => this.setState({password})}
          />
        </View>
        {user.errorMessage ?
          <Text style={styles.errorMessage}>{user.errorMessage}</Text> : null}
        <SwitchType type={type} onPress={() => this.switchType()} />
        {type === 'login' ?
          <Text
            style={styles.switchForgotPassword}
            onPress={userSwitchForgotPassword}
          >{'パスワードを忘れた方はこちら'}</Text> : null}
        <View>
          {type === 'createUser' ?
            <ButtonDefault
              text={'登録する'}
              onPress={() => userCreate(this.state.email, this.state.password)}
              disabled={disabled}
            /> : null}
          {type === 'login' ?
            <ButtonDefault
              text={'ログイン'}
              onPress={() => userLogin(this.state.email, this.state.password)}
              disabled={disabled}
            /> : null}
        </View>
      </View>
    );
  }
}
