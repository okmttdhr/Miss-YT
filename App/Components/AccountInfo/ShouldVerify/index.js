// @flow
import React from 'react';
import {View, Text} from 'react-native';

import styles from './style';
import type {TDefaultUser} from '../../../types';
import {ButtonDefault} from '../../ButtonDefault';
import {Loading} from '../../Loading/';

type TShouldVerify = {
  user: TDefaultUser;
  sendEmailVerification: () => any;
  reload: () => any;
}

export const ShouldVerify = ({user, sendEmailVerification, reload}: TShouldVerify) => (
  <View>
    <Loading isShow={user.isFetching} />
    <Text style={styles.text}>{'確認用のメールが送信されました。メールアドレスをご確認ください。'}</Text>
    <View style={styles.buttons}>
      <ButtonDefault text="確認完了" style={styles.done} onPress={reload} />
      <ButtonDefault text="メールをもう一度送信" onPress={sendEmailVerification} />
    </View>
  </View>
);
