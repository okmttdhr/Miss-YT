// @flow
import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import {TextInput, Text} from 'react-native';
import { spy } from 'sinon';

import { defaultUserMock, userActionsMock } from '../../../../Tests/mock/';
import {ButtonDefault} from '../../ButtonDefault';
import {PasswordResetForm} from './index';

test('should input text', (t) => {
  const wrapper = shallow(
    <PasswordResetForm
      user={defaultUserMock}
      userActions={userActionsMock}
    />,
  );
  wrapper.find(TextInput).first().simulate('changeText', 'email@gmail.com');
  t.deepEqual(wrapper.state('email'), 'email@gmail.com');
});

test('could switch to login page', (t) => {
  const spiedSwitchForgotPassword = spy(userActionsMock, 'userSwitchForgotPassword');
  const wrapper = shallow(
    <PasswordResetForm
      user={defaultUserMock}
      userActions={userActionsMock}
    />,
  );
  wrapper.find(Text).first().simulate('press');
  t.deepEqual(spiedSwitchForgotPassword.called, true);
});

test('could send password reset email', (t) => {
  const spiedSendPasswordResetEmail = spy(userActionsMock, 'userSendPasswordResetEmail');
  const wrapper = shallow(
    <PasswordResetForm
      user={defaultUserMock}
      userActions={userActionsMock}
    />,
  );
  wrapper.find(ButtonDefault).first().simulate('press');
  t.deepEqual(spiedSendPasswordResetEmail.called, true);
});
