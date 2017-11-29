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

export class DisplayName extends Component<TDisplayName, {displayName: string}> {
  constructor(props: TDisplayName) {
    super(props);
    this.state = {
      displayName: '',
    };
  }

  componentWillReceiveProps(nextProps: TDisplayName) {
    this.setState({displayName: nextProps.user.item.displayName});
  }

  props: TDisplayName;

  handleOnChangeText(name: string) {
    this.setState({displayName: name});
    if (!name) {
      this.props.updateProfile({displayName: name});
    }
  }

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
            onChangeText={name => this.handleOnChangeText(name)}
            onBlur={e => updateProfile({displayName: e.nativeEvent.text})}
            value={value}
          />
        }
      </View>
    );
  }
}
