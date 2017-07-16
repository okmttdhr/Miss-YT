// @flow
import test from 'ava';
import React from 'react';
import {TextInput, Text} from 'react-native';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import { assign } from 'lodash';

import { defaultUserMock, userActionsMock } from '../../../../Tests/mock/';
import { AuthenticateForm } from './index';
import { SwitchType } from '../SwitchType';
import {ButtonDefault} from '../../ButtonDefault';

test('should input text', (t) => {
  const wrapper = shallow(
    <AuthenticateForm user={defaultUserMock} userActions={userActionsMock} />,
  );
  wrapper.find(TextInput).first().simulate('changeText', 'email@gmail.com');
  wrapper.find(TextInput).last().simulate('changeText', 'password');
  t.deepEqual(wrapper.state('email'), 'email@gmail.com');
  t.deepEqual(wrapper.state('password'), 'password');
});

test('should call createUser request', (t) => {
  const spiedCreateUserMock = spy(userActionsMock, 'userCreate');
  const wrapper = shallow(
    <AuthenticateForm user={defaultUserMock} userActions={userActionsMock} />,
  );
  wrapper.find(SwitchType).first().simulate('press');
  wrapper.find(ButtonDefault).first().simulate('press');
  t.is(spiedCreateUserMock.called, true);
});

test('should call login request', (t) => {
  const spiedLoginMock = spy(userActionsMock, 'userLogin');
  const wrapper = shallow(
    <AuthenticateForm user={defaultUserMock} userActions={userActionsMock} />,
  );
  wrapper.find(ButtonDefault).first().simulate('press');
  t.is(spiedLoginMock.called, true);
});

test('should switch account type', (t) => {
  const wrapper = shallow(
    <AuthenticateForm user={defaultUserMock} userActions={userActionsMock} />,
  );
  t.is(wrapper.state('type'), 'login');
  wrapper.find(SwitchType).first().simulate('press');
  t.is(wrapper.state('type'), 'createUser');
});

test('should display error message', (t) => {
  const wrapper = shallow(
    <AuthenticateForm user={assign({}, defaultUserMock, {errorMessage: 'error'})} userActions={userActionsMock} />,
  );
  t.is(wrapper.containsMatchingElement(<Text>error</Text>), true);
});
