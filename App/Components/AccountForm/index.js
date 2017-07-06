// @flow
import React, {Component} from 'react';
import { View, Text, TextInput } from 'react-native';

import styles from './style';
import type {TDefaultUser, TAuthenticate} from '../../types/';
import {ButtonDefault} from '../ButtonDefault';
import {SwitchType} from './SwitchType';

type TAccountForm = {
  user: TDefaultUser;
  login: TAuthenticate;
  createUser: TAuthenticate;
}

export type AccountType = 'login' | 'createUser';

export class AccountForm extends Component {
  constructor(props: TAccountForm) {
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
  props: TAccountForm

  switchType() {
    const type = this.state.type === 'login' ? 'createUser' : 'login';
    this.setState({type});
  }

  render() {
    console.log(this.state);
    const {type} = this.state;
    const {user, login, createUser} = this.props;
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
        <View>
          {type === 'createUser' ?
            <ButtonDefault
              text={'登録する'}
              onPress={() => createUser(this.state.email, this.state.password)}
              disabled={disabled}
            /> : null}
          {type === 'login' ?
            <ButtonDefault
              text={'ログイン'}
              onPress={() => login(this.state.email, this.state.password)}
              disabled={disabled}
            /> : null}
        </View>
      </View>
    );
  }
}
