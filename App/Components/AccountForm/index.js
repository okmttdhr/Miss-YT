// @flow
import React, {Component} from 'react';
import { View, Text, TextInput } from 'react-native';

import styles from './style';
import type {TDefaultUser} from '../../types/';
import {FullButton} from '../FullButton';

type TAccountForm = {
  user: TDefaultUser;
  login: () => void;
  createUser: () => void;
}

type AccountType = 'login' | 'createUser';

export const SwitchType = ({onPress, type}: {type: AccountType, onPress: () => void}) => (
  <Text onPress={onPress}>
    {type === 'createUser' ?
      '既にアカウントをお持ちの方はこちらをタップ' : 'まだアカウントをお持ちでない方はこちらをタップ'}
  </Text>
);

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
    const disabled = this.state.email === '' || this.state.password === '';
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40}}
          placeholder="メールアドレス"
          onChangeText={email => this.setState({email})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="パスワード"
          secureTextEntry
          onChangeText={password => this.setState({password})}
        />
        <Text>{user.errorMessage}</Text>
        <SwitchType type={type} onPress={() => this.switchType()} />
        {type === 'createUser' ?
          <FullButton
            text={'登録する'}
            onPress={() => createUser()}
            disabled={disabled}
          /> : null}
        {type === 'login' ?
          <FullButton
            text={'ログイン'}
            onPress={() => login()}
            disabled={disabled}
          /> : null}
      </View>
    );
  }
}
