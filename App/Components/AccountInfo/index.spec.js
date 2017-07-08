// @flow
import test from 'ava';
import React from 'react';
import {Text} from 'react-native';
import { shallow } from 'enzyme';
import { merge } from 'lodash';

import { defaultUserMock } from '../../../Tests/mock/';
import { noop } from '../../Services';
import { AccountInfo } from './index';
import {DisplayName} from './DisplayName/';

const userActionsMock = {
  userRequest: noop,
  userLogin: (email: string, password: string) => {
    console.log('userActionsMock.userLogin');
    console.log(email, password);
  },
  userCreate: (email: string, password: string) => {
    console.log('userActionsMock.userCreate');
    console.log(email, password);
  },
  userSuccess: noop,
  userFailure: noop,
  userUpdateProfile: noop,
  userSendEmailVerification: noop,
  userReload: noop,
};

test('should display name and email', (t) => {
  const verifiedUserMock = merge({}, defaultUserMock, {item: {emailVerified: true}});
  const wrapper = shallow(
    <AccountInfo user={verifiedUserMock} userActions={userActionsMock} />,
  );
  t.is(wrapper.containsMatchingElement(
    <DisplayName user={verifiedUserMock} updateProfile={userActionsMock.userUpdateProfile} />,
  ), true);
  t.is(wrapper.containsMatchingElement(<Text>MOCK_EMAIL</Text>), true);
});
