// @flow
import React, {Component} from 'react';
import {View, TextInput} from 'react-native';

import styles from './style';
import type {TUserUpdateProfile, TDefaultUser} from '../../../types/';
import {Loading} from '../../Loading/';

type TDisplayName = {
  user: TDefaultUser;
  updateProfile: TUserUpdateProfile;
}

export class DisplayName extends Component {
  constructor(props: TDisplayName) {
    super(props);
    this.state = {
      displayName: '',
    };
  }

  state: {
    displayName: string;
  }

  componentWillReceiveProps(nextProps: TDisplayName) {
    this.setState({displayName: nextProps.user.item.displayName});
  }

  props: TDisplayName;

  render() {
    const {updateProfile, user} = this.props;
    const value = this.state.displayName || this.props.user.item.displayName;
    return (
      <View style={styles.container}>
        {user.isFetching ?
          <Loading isShow /> :
          <TextInput
            style={styles.textInput}
            placeholder="名前を入力する"
            onChangeText={name => this.setState({displayName: name})}
            onBlur={e => updateProfile({displayName: e.nativeEvent.text})}
            value={value}
          />
        }
      </View>
    );
  }
}
