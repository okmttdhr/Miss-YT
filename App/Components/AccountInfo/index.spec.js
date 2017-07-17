// @flow
import test from 'ava';
import React from 'react';
import {Text} from 'react-native';
import { shallow } from 'enzyme';
import { merge } from 'lodash';

import { defaultUserMock, userActionsMock } from '../../../Tests/mock/';
import { AccountInfo } from './index';
import {DisplayName} from './DisplayName/';

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
