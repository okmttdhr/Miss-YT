// @flow
import test from 'ava';
import React from 'react';
import {TextInput, Text} from 'react-native';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import { assign } from 'lodash';

import { defaultUserMock } from '../../../Tests/mock/';
import { AccountForm } from './index';
import { SwitchType } from './SwitchType';
import {FullButton} from '../FullButton';

const loginMock = () => {
  console.log('loginMock');
};
const createUserMock = () => {
  console.log('createUserMock');
};

test('should input text', (t) => {
  const wrapper = shallow(
    <AccountForm user={defaultUserMock} login={loginMock} createUser={createUserMock} />,
  );
  wrapper.find(TextInput).first().simulate('changeText', 'email@gmail.com');
  wrapper.find(TextInput).last().simulate('changeText', 'password');
  t.deepEqual(wrapper.state('email'), 'email@gmail.com');
  t.deepEqual(wrapper.state('password'), 'password');
});

test('should call createUser request', (t) => {
  const spiedCreateUserMock = spy(createUserMock);
  const wrapper = shallow(
    <AccountForm user={defaultUserMock} login={loginMock} createUser={spiedCreateUserMock} />,
  );
  wrapper.find(SwitchType).first().simulate('press');
  wrapper.find(FullButton).first().simulate('press');
  t.is(spiedCreateUserMock.called, true);
});

test('should call login request', (t) => {
  const spiedLoginMock = spy(loginMock);
  const wrapper = shallow(
    <AccountForm user={defaultUserMock} login={spiedLoginMock} createUser={createUserMock} />,
  );
  wrapper.find(FullButton).first().simulate('press');
  t.is(spiedLoginMock.called, true);
});

test('should switch account type', (t) => {
  const wrapper = shallow(
    <AccountForm user={defaultUserMock} login={loginMock} createUser={createUserMock} />,
  );
  t.is(wrapper.state('type'), 'login');
  wrapper.find(SwitchType).first().simulate('press');
  t.is(wrapper.state('type'), 'createUser');
});

test('should display error message', (t) => {
  const wrapper = shallow(
    <AccountForm user={assign({}, defaultUserMock, {errorMessage: 'error'})} login={loginMock} createUser={createUserMock} />,
  );
  t.is(wrapper.contains(<Text>error</Text>), true);
});
